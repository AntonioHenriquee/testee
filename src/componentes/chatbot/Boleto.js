import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Loading } from 'react-simple-chatbot';
import Globais from './Globais';

class Boleto extends Component {
  constructor(props) {
    super(props);
    const { steps } = this.props;
    const { userConta, userDiaVencimento, emissao_De_boleto} = steps;

    this.state =  {emissao_De_boleto, userConta, userDiaVencimento, loading: true, trigger: false, }; 
    this.triggetNext = this.triggetNext.bind(this);
}


async componentDidMount() {

    const self = this;
    const data = this.state.userDiaVencimento.value.split("/");
    const userObject = {
        userConta:this.state.userConta.value,
        userDiaVencimento:`${data[2]}-${data[1]}-${data[0]}`,
        emissao_De_boleto:this.state.emissao_De_boleto.value
        };
        var headers = new Headers();
        headers.append('Authorization', 'Basic ' + btoa('barramento:QnJiMTIzNDU2Nzg='));
        await fetch('https://desenvolvimento.brbservicos.com.br/barramentocobranca/api/Cobranca/BoletoCobrancaTelefonia?conta='+userObject.userConta+'&tipo='+userObject.emissao_De_boleto+'&vencimento='+userObject.userDiaVencimento, { headers: headers })
            .then(response => response.text())
            .then(data => this.setState({ retorno: data }));

            if(this.state.retorno === null || this.state.retorno === undefined || this.state.retorno === ""){
                self.setState({ loading: false, result: "Desculpe não localizei um boleto para os dados informados",caminho: "pergunta_Encerrar_Voltar_Menu_inicial_Refazer_Boleto" });
            }
            else{
                self.setState({ loading: false, 
                result: `Essa é a linha digitável do seu boleto:
                ${this.state.retorno.substr(1, 18)}\n${this.state.retorno.substr(18)}`,
                result2: `O pagamento pode ser realizado em qualquer agência bancária.`, 
                caminho: "p_Notificacao" });
                Globais.linhaDigitavel = this.state.retorno;
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
    const { loading, result, result2 } = this.state;
    return (
        <div
        style={{
        }}>
        { loading ? <Loading /> : result }
        <br/>
        {loading ? '': result2}
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

  Boleto.propTypes = {
    steps: PropTypes.object,
    triggerNextStep: PropTypes.func,
  };
  
  Boleto.defaultProps = {
    steps: undefined,
    triggerNextStep: undefined,
  };
  export default Boleto;