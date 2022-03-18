import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Loading } from 'react-simple-chatbot';
import Globais from './Globais';


class Post extends Component {
  constructor(props) {
    super(props);
    const { steps } = this.props;
    const { userCPF, userCartao, conta } = steps;
     this.state =  {conta, userCPF, userCartao, loading: true, trigger: false, }; 
    this.triggetNext = this.triggetNext.bind(this);
}


async componentDidMount() {
    const self = this;
    const userObject = {
        cpf: this.state.userCPF.value
        };
            var headers = new Headers({
              'Accept': 'application/json, text/plain',
              'Content-Type': 'application/json;charset=UTF-8'
            });
            headers.append('Authorization', 'Basic ' + btoa('barramento:QnJiMTIzNDU2Nzg='));
            if(this.state.userCartao === undefined){
              await fetch('https://desenvolvimento.brbservicos.com.br/barramentocobranca/api/Cobranca/BuscarCobrancaCliente', { headers: headers, method: 'POST',	mode: 'cors', cache: 'default', body: JSON.stringify(userObject) })
              .then(response => response.json())
              .then(data => this.setState({ retorno: data }));
              console.log(this.state.retorno);
              Globais.Cliente = this.state.retorno;
            }else{
              const userObject2 = {
                cpf: this.state.userCPF.value,
                cartao: this.state.userCartao.value
                };
              await fetch('https://desenvolvimento.brbservicos.com.br/barramentocobranca/api/Cobranca/BuscarCobrancaCliente', { headers: headers, method: 'POST',	mode: 'cors', cache: 'default', body: JSON.stringify(userObject2) })
              .then(response => response.json())
              .then(data => this.setState({ retorno: data }));
              console.log(this.state.retorno);
              Globais.Cliente = this.state.retorno;
              //  this.setState({ retorno:  Globais.Cliente.filter(item => item.cartoes.cartao.indexOf(this.state.userCartao.value) === this.state.userCartao.value) });
              // await fetch(`https://desenvolvimento.brbservicos.com.br/barramentocobranca/api/Cobranca/BuscarCobrancaClienteTelefonia?cpf=${userObject.userCPF}&conta=&cartao=${userObject.userCartao.value}`, { headers: headers })
              // .then(response => response.text())
              // .then(data => this.setState({ retorno: data }));
            }

            if(this.state.retorno.result === false && this.state.retorno.msg === "ERRO"){
              self.setState({ loading: false,result: 'Ocorreu eum erro ao pesquisar divida', caminho: "pergunta_Encerrar_Voltar_Menu_inicial" });
            }
            else if(this.state.retorno.cartoes === null && this.state.retorno.result === true){
              self.setState({ loading: false,result: this.state.retorno.msg, caminho: "pergunta_Encerrar_Voltar_Menu_inicial" });
            } 
            else if(this.state.retorno.cartoes !== null && this.state.retorno.cartoes.length > 1){
              console.log(this.state.retorno.cartoes.length);
                  var dados = [];

                  for(let elemento of this.state.retorno.cartoes){
                    dados.push(elemento.cartao);
                  }
                  console.log(dados)
                self.setState({ loading: false, 
                  result: 'Encontramos mais de um cartão para este CPF:', 
                  result3:  dados.join(' ') +'\n', 
                  result4: 'Informe os quatros últimos dígitos do cartão que deseja simular', 
                  caminho: "maisDeUmaDivida" });
            }
            else if(this.state.retorno.cartoes[0].msg === "Sr. Cliente você poderá aderir a uma das nossas opções de Parcelamento de Fatura disponíveis pelo APP ou ligar para o telefone 0800-88004001."){
              self.setState({ loading: false, result: 'Sr. Cliente não consta dívida para este cartão, no entanto, você poderá aderir a uma das nossas opções de Parcelamento da Fatura atual disponível pelo APP ou ligar para o telefone 0800-88004001', caminho: "pergunta_Encerrar_Voltar_Menu_inicial" });
            }
            else if(this.state.retorno.cartoes[0].msg !== ""){
              self.setState({ loading: false, result: this.state.retorno.cartoes[0].msg, caminho: "pergunta_Encerrar_Voltar_Menu_inicial" });
            }
            else if(this.state.retorno.result === true) {
                self.setState({valor: parseFloat(this.state.retorno.cartoes[0].saldo_a_vista).toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})});
                self.setState({ loading: false, result: 'Olá '+this.state.retorno.cartoes[0].nome.split(' ').slice(0, 2).join(' ') +'! O valor líquido da sua dívida é de '+this.state.valor+'\n com '+this.state.retorno.cartoes[0].dias_atraso+' dias em atraso', caminho: "pergunta_Menu_Quitacao_Simulacao" });
                Globais.conta = this.state.retorno.cartoes[0].conta;
            }
            

            if(!this.trigger){
              this.triggetNext();
            }
 
    }
    triggetNext() {
        this.setState({ trigger: true }, () => {
          this.props.triggerNextStep({ trigger: this.state.caminho });
          
        });
      }
      render() {
        const { loading, result, result3, result4 } = this.state;
        return (
            <div
            style={{
            }}>
            { loading ? <Loading /> : result }
            <br/>
            {loading ? '': result3}
            <br/>
            {loading ? '': result4}
            {
              !loading &&
              <div
                style={{
                  marginTop: 10,
                }}
              >
              </div>
            }
          </div>      
      );
    }
  };

Post.propTypes = {
    steps: PropTypes.object,
    triggerNextStep: PropTypes.func,
  };
  
Post.defaultProps = {
    steps: undefined,
    triggerNextStep: undefined,
  };
  export default Post;
  