import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Loading } from 'react-simple-chatbot';
import Globais from './Globais';

class BoletoNegociado extends Component {
  constructor(props) {
    super(props);
    const { steps } = this.props;
    const { userConta, userDiaVencimento, userMesVencimento, userAnoVencimento, emissao_De_boleto } = steps;

    this.state = { emissao_De_boleto, userConta, userDiaVencimento, userMesVencimento, userAnoVencimento, loading: true, trigger: false, };
    this.triggetNext = this.triggetNext.bind(this);
  }


  async componentDidMount() {

    const self = this;
    const userObject = {
      conta: Globais.BoletoRequest[0].conta,
      tipo: Globais.BoletoRequest[0].tipo,
      pdf: Globais.BoletoRequest[0].pdf,
      vencimento: Globais.BoletoRequest[0].vencimento,
      nossoNumero: Globais.BoletoRequest[0].nossoNumero
    };
    // const userObject = {
    //   conta: "5222731102660009",
    //   tipo: "fatura",
    //   pdf: true,
    //   vencimento:"2021-07-25",
    //   nossoNumero: 0
    // };
    var headers = new Headers({
      'Accept': 'application/json, text/plain',
      'Content-Type': 'application/json;charset=UTF-8'
    });
    headers.append('Authorization', 'Basic ' + btoa('barramento:QnJiMTIzNDU2Nzg='));
    await fetch('https://desenvolvimento.brbservicos.com.br/barramentocobranca/api/Cobranca/GerarBoleto', { headers: headers, method: 'POST', mode: 'cors', cache: 'default', body: JSON.stringify(userObject) })
      .then(response => response.json())
      .then(data => this.setState({ retorno: data }));
    if (this.state.retorno === null || this.state.retorno.status.toUpperCase() === "KO") {
      self.setState({ loading: false, result: `Desculpe ocorreu um erro:\n${this.state.retorno.msg}`, caminho: "pergunta_Encerrar_Voltar_Menu_inicial_Refazer_Boleto" });
    }
    else {
      self.setState({
        loading: false,
        result: `Essa é a linha digitável do seu boleto:
                ${this.state.retorno.boleto.linhaDigitavel.substr(1, 18)}\n${this.state.retorno.boleto.linhaDigitavel.substr(18)}`, caminho: "p_Notificacao"
      });
      Globais.linhaDigitavel = this.state.retorno.boleto.linhaDigitavel;
    }
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
    const { loading, result, result2 } = this.state;
    return (
      <div
        style={{
        }}>
        {loading ? <Loading /> : result}
        <br />
        {loading ? '' : result2}
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

BoletoNegociado.propTypes = {
  steps: PropTypes.object,
  triggerNextStep: PropTypes.func,
};

BoletoNegociado.defaultProps = {
  steps: undefined,
  triggerNextStep: undefined,
};
export default BoletoNegociado;