import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Loading } from 'react-simple-chatbot';
import Globais from './Globais';

class Simulacao extends Component {
  constructor(props) {
    super(props);
    const { steps } = this.props;
    const { userQtdParcela, userValorEntrada, userCPF, conta } = steps;

    this.state = { conta, userCPF, userQtdParcela, userValorEntrada, loading: true, trigger: false, };
    this.triggetNext = this.triggetNext.bind(this);
  }

  async componentDidMount() {
    const self = this;

    const userObject =
    {
      conta: Globais.conta,
      cpfCnpj: this.state.userCPF.value,
      parcelas: parseFloat(this.state.userQtdParcela.value),
      entrada: parseFloat(this.state.userValorEntrada.value.replace(".", "").replace(",", ".")),
      alcada: "CHAT"
    }
    var headers = new Headers({
      'Accept': 'application/json, text/plain',
      'Content-Type': 'application/json;charset=UTF-8'
    });
    headers.append('Authorization', 'Basic ' + btoa('barramento:QnJiMTIzNDU2Nzg='));
    await fetch('https://desenvolvimento.brbservicos.com.br/barramentocobranca/api/Cobranca/Simular', { headers: headers, method: 'POST', mode: 'cors', cache: 'default', body: JSON.stringify(userObject) })
      .then(response => response.json())
      .then(data => this.setState({ retorno: data }));
    console.log(this.state.retorno);
    if (this.state.retorno.status.toUpperCase() === "OK") {
      Globais.Simulacao = this.state.retorno;
      self.setState({ valor: parseFloat(this.state.retorno.vlParcela).toLocaleString('pt-br', { style: 'currency', currency: 'BRL' }) });
      self.setState({ loading: false, result: 'O valor da parcela será de ' + this.state.valor + ' em ' + this.state.retorno.nrParcela + ' vezes com taxa de juros de ' + this.state.retorno.txJuros + '% ao mês', caminho: "Inf_Simular_Efetivar" });
    } else {
      self.setState({ loading: false, result: "Ocorreu um erro:(" + this.state.retorno.msg + ") ao gerar esta simulçao tente mais tarde", caminho: "pergunta_Encerrar_Voltar_Menu_inicial" });
    }
    // if(this.state.retorno === null || this.state.retorno === undefined || this.state.retorno === ""){
    //     self.setState({ loading: false, result: "Ocorreu um erro ao gerar esta simulçao tente mais tarde",caminho: "pergunta_Encerrar_Voltar_Menu_inicial" });
    // }
    // if(this.state.retorno === '0.0'){
    //     self.setState({ loading: false, result: "Condições não permitidas (quantidade de parcelas: "+userObject.userQtdParcela+" e/ou valor de entrada: R$ "+userObject.userValorEntrada+" ...), tente novamente utilizando outras condições",caminho: "simularDivida" });
    // }
    // else{
    //     self.setState({valor: parseFloat(this.state.retorno.split(".", 4)[0]+'.'+this.state.retorno.split(".", 4)[1]).toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})});
    //     self.setState({ loading: false, result: 'O valor da parcela será de '+this.state.valor+' com taxa de juros de '+this.state.retorno.split(".", 4)[2]+'%', caminho: "Inf_Simular_Efetivar" });
    // }
    if (!this.trigger) {
      this.triggetNext();
    }
  }
  triggetNext() {
    this.setState({ trigger: true }, () => {
      this.props.triggerNextStep({ trigger: this.state.caminho });

    });
  }
  render() {
    const { loading, result } = this.state;
    return (
      <div>
        {loading ? <Loading /> : result}
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

Simulacao.propTypes = {
  steps: PropTypes.object,
  triggerNextStep: PropTypes.func,
};

Simulacao.defaultProps = {
  steps: undefined,
  triggerNextStep: undefined,
};
export default Simulacao;