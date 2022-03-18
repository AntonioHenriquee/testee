import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Loading } from 'react-simple-chatbot';
import Globais from './Globais';

class ConfirmaQuitacao extends Component {
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
      conta: Globais.Cliente.cartoes[0].conta,
      cpfCnpj: this.state.userCPF.value,
      parcelas: 1,
      entrada: parseFloat(Globais.Cliente.cartoes[0].vlLiquido),
      alcada: "CHAT"
    }
    console.log(userObject);
    var headers = new Headers({
      'Accept': 'application/json, text/plain',
      'Content-Type': 'application/json;charset=UTF-8'
    });
    headers.append('Authorization', 'Basic ' + btoa('barramento:QnJiMTIzNDU2Nzg='));
    await fetch('https://desenvolvimento.brbservicos.com.br/barramentocobranca/api/Cobranca/Simular', { headers: headers, method: 'POST', mode: 'cors', cache: 'default', body: JSON.stringify(userObject) })
      .then(response => response.json())
      .then(data => this.setState({ retorno: data }));
    console.log(this.state.retorno);
    if (this.state.retorno.status === "ok") {
      Globais.Simulacao = this.state.retorno;
      self.setState({ loading: false, caminho: "p_Quitar" });
    } else {
      self.setState({ loading: false, result: "Ocorreu um erro:(" + this.state.retorno.msg + ") ao gerar esta simulçao tente mais tarde", caminho: "pergunta_Encerrar_Voltar_Menu_inicial" });
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
  addDay(dias) {
    var data = new Date();
    data.setDate(data.getDate() + dias);
    return data.toLocaleString();
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
            <b>- Resumo do Acordo:</b>
            <br />
            <p>O(a) Sr.(a) <b>{Globais.Cliente.cartoes[0].nome}</b> confirma a negociação do cartão <b>{Globais.Cliente.cartoes[0].produto}</b>, formalizada em <b> {new Date().toLocaleString()} </b> no valor de <b>{parseFloat(Globais.Simulacao.quitacao.valor).toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })}</b> com o desconto de <b>{parseFloat(Globais.Simulacao.quitacao.valor_desconto).toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })}</b> e IOF incluso, com vencimento para o dia
              <b>{"\n" + this.addDay(Globais.Cliente.cartoes[0].vencimento).split(' ')[0]
              }</b> cobrado por meio de DÉBITO AUTOMÁTICO EM C/C e/ou FATURA.</p>

            <p>Caso a quitação não seja efetivada até o vencimento, haverá a quebra do acordo e a negociação deverá ser refeita, também poderá ocorrer débitos na conta corrente, conforme cláusula 13.2 do contrato único de adesão ao cartão de crédito BRB, assim como a inclusão de restrições nos órgãos de proteção ao crédito e demais ações de cobrança;</p>
            <p>As anotações em SERASA serão excluídas em até 05 dias uteis;</p>
            <p>Caso não receba a fatura até o vencimento poderá retornar o contato no 3048-8020 para solicitar o boleto da parcela.</p>

          </div>
        }
      </div>
    );
  }
};

ConfirmaQuitacao.propTypes = {
  steps: PropTypes.object,
  triggerNextStep: PropTypes.func,
};

ConfirmaQuitacao.defaultProps = {
  steps: undefined,
  triggerNextStep: undefined,
};
export default ConfirmaQuitacao;