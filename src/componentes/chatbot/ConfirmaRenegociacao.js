import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Globais from './Globais';

class ConfirmaRenegociacao extends Component {
  constructor(props) {
    super(props);
    this.state = { trigger: false, };
    this.triggetNext = this.triggetNext.bind(this);
  }


  async componentDidMount() {
    const self = this;
    self.setState({ caminho: "p_Renegociacao" });
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
    return (
      <div
        style={{
          //background:'#007aff'
        }}>

        <b>- Resumo do Acordo:</b>
        <br />
        <p>O(a) Sr.(a) <b>{Globais.Cliente.cartoes[0].nome}</b> confirma a negociação do cartão <b>{Globais.Cliente.cartoes[0].produto}</b>, formalizada em <b> {new Date().toLocaleString()} </b> no valor de <b>{parseFloat(Globais.Simulacao.vlFinanciavel).toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })}</b> com a taxa de juros de <b>{Globais.Simulacao.txJuros}%</b> e IOF incluso na primeira parcela, com vencimento para o dia
          <b>{"\n" + this.addDay(Globais.Cliente.cartoes[0].vencimento).split(' ')[0]
          }</b> cobrado mensalmente por meio de DÉBITO AUTOMÁTICO EM C/C: <b>{Globais.Cliente.cartoes[0].conta}</b> e/ ou FATURA.</p>

        <p>Caso as parcelas da negociação não sejam pagas até o vencimento, haverá a quebra do acordo e a negociação deverá ser refeita, também poderá ocorrer débitos na conta corrente, conforme cláusula 13.2 do contrato único de adesão ao cartão de crédito BRB, assim como a inclusão de restrições nos órgãos de proteção ao crédito e demais ações de cobrança;</p>
        <p>As anotações em SERASA serão excluídas em até 05 dias uteis;</p>
        <p>Caso não receba a fatura até o vencimento poderá retornar o contato no 3048-8020 para solicitar o boleto da parcela.</p>
      </div>
    );
  }
};

ConfirmaRenegociacao.propTypes = {
  steps: PropTypes.object,
  triggerNextStep: PropTypes.func,
};

ConfirmaRenegociacao.defaultProps = {
  steps: undefined,
  triggerNextStep: undefined,
};
export default ConfirmaRenegociacao;