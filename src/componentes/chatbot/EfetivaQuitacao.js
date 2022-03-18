import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Loading } from 'react-simple-chatbot';
import Globais from './Globais';

class EfetivaQuitacao extends Component {
  constructor(props) {
    super(props);
    this.state = { loading: true, trigger: false, };
    this.triggetNext = this.triggetNext.bind(this);
  }

  async componentDidMount() {
    const self = this;
    const userObject =
    {
      id: 0,
      idQuitacaoRenegociacao: 0,
      conta: Globais.Cliente.cartoes[0].conta,
      atendente: "u99754",
      alcada: "Operador"
    }
    console.log(userObject);
    var headers = new Headers({
      'Accept': 'application/json, text/plain',
      'Content-Type': 'application/json;charset=UTF-8'
    });
    headers.append('Authorization', 'Basic ' + btoa('barramento:QnJiMTIzNDU2Nzg='));
    await fetch('https://desenvolvimento.brbservicos.com.br/barramentocobranca/api/Cobranca/Quitacao', { headers: headers, method: 'POST', mode: 'cors', cache: 'default', body: JSON.stringify(userObject) })
      .then(response => response.json())
      .then(data => this.setState({ retorno: data }));
    console.log(this.state.retorno);
    if (this.state.retorno.status.toUpperCase() === "OK") {
      Globais.Quitacao = this.state.retorno;
      Globais.BoletoRequest = [{
        "conta": Globais.Cliente.cartoes[0].conta,
        "tipo": "quitacao",
        "pdf": true,
        "vencimento": `${new Date().getFullYear()}-${new Date().getMonth() + 1}-${new Date().getDate()}`,
        "nossoNumero": 0
      }];
      self.setState({ loading: false, result: `Quitação realizada com sucesso`, caminho: "GeraBoleto_negociado" });
    } else {
      self.setState({ loading: false, result: "Ocorreu um erro:(" + this.state.retorno.msg + ") ao efetivar quitação tente mais tarde", caminho: "Encerrar_Voltar_Menu_inicial" });
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

EfetivaQuitacao.propTypes = {
  steps: PropTypes.object,
  triggerNextStep: PropTypes.func,
};

EfetivaQuitacao.defaultProps = {
  steps: undefined,
  triggerNextStep: undefined,
};
export default EfetivaQuitacao;