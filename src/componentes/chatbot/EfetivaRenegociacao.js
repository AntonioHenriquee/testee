import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Loading } from 'react-simple-chatbot';
import Globais from './Globais';

class EfetivaRenegociacao extends Component {
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
      id: 0,
      idRenegociacao: 0,
      conta: Globais.Cliente.cartoes[0].conta,
      parcelas: parseFloat(this.state.userQtdParcela.value),
      entrada: parseFloat(this.state.userValorEntrada.value.replace(".", "").replace(",", ".")),
      valorSolicitado: parseFloat(Globais.Cliente.cartoes[0].saldo_a_vista - parseFloat(this.state.userValorEntrada.value.replace(".", "").replace(",", "."))),
      atendente: "u94219"
    }
    var headers = new Headers({
      'Accept': 'application/json, text/plain',
      'Content-Type': 'application/json;charset=UTF-8'
    });
    headers.append('Authorization', 'Basic ' + btoa('barramento:QnJiMTIzNDU2Nzg='));
    await fetch('https://desenvolvimento.brbservicos.com.br/barramentocobranca/api/Cobranca/Renegociacao', { headers: headers, method: 'POST', mode: 'cors', cache: 'default', body: JSON.stringify(userObject) })
      .then(response => response.json())
      .then(data => this.setState({ retorno: data }));
    console.log(this.state.retorno);
    if (this.state.retorno.status.toUpperCase() === "OK") {
      Globais.Renegociacao = this.state.retorno;
      if (this.state.retorno.proximoDiaUtil === null) {
        Globais.BoletoRequest = [{
          "conta": Globais.Cliente.cartoes[0].conta,
          "tipo": "entrada",
          "pdf": true,
          "vencimento": this.state.retorno.dataLimitePagamento,
          "nossoNumero": 0
        }];
        self.setState({ loading: false, result: `Renegociação realizada com sucesso`, caminho: "GeraBoleto_negociado" });
      } else {
        self.setState({ loading: false, result: `Renegociação realizada com sucesso, porem só será formalizada no próximo dia útil`, caminho: "pergunta_Encerrar_Voltar_Menu_inicial" });
      }
    } else {
      self.setState({ loading: false, result: "Ocorreu um erro:(" + this.state.retorno.msg + ") ao efetivar renegociação tente novamente mais tarde", caminho: "pergunta_Encerrar_Voltar_Menu_inicial" });
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

EfetivaRenegociacao.propTypes = {
  steps: PropTypes.object,
  triggerNextStep: PropTypes.func,
};

EfetivaRenegociacao.defaultProps = {
  steps: undefined,
  triggerNextStep: undefined,
};
export default EfetivaRenegociacao;