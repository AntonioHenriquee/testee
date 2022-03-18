import React, { Component } from 'react';
import ChatBot from 'react-simple-chatbot';
import { ThemeProvider } from 'styled-components';
import Post from './Post';
import Boleto from './Boleto';
import BoletoNegociado from './BoletoNegociado';
import Simulacao from './Simulacao';
import NotificaSms from './NotificarSms';
import ConfirmaRenegociacao from './ConfirmaRenegociacao';
import EfetivaQuitacao from './EfetivaQuitacao';
import EfetivaRenegociacao from './EfetivaRenegociacao';
import ConfirmaQuitacao from './ConfirmaQuitacao';
import NotificaEmail from './NotificaEmail';
import ChatIcon from './ChatIcon';


// all available theme props
const theme = {
  background: '#f5f8fb',
  fontFamily: 'sans-serif',
  headerBgColor: '#007aff',
  headerFontColor: '#fff',
  headerFontSize: '15px',
  botBubbleColor: '#007aff',
  botFontColor: '#fff',
  userBubbleColor: '#5DA5E8',
  userFontColor: '#fff',
};
ChatBot.defaultProps = {
  avatarStyle: {},
  botDelay: 1000,
  botName: 'The bot',
  bubbleOptionStyle: {},
  bubbleStyle: {},
  cache: false,
  cacheName: 'rsc_cache',
  className: '',
  contentStyle: {},
  customStyle: {},
  controlStyle: { position: 'absolute', right: '0', top: '0' },
  customDelay: 1000,
  enableMobileAutoFocus: false,
  enableSmoothScroll: false,
  extraControl: undefined,
  floating: true,
  floatingIcon: <ChatIcon />,
  floatingStyle: {},
  footerStyle: {},
  handleEnd: undefined,
  headerComponent: undefined,
  headerTitle: 'BRB Serviços',
  height: '500px',
  hideBotAvatar: false,
  hideHeader: false,
  hideSubmitButton: false,
  hideUserAvatar: false,
  inputStyle: {},
  opened: undefined,
  placeholder: 'Digite a sua mensagem...',
  inputAttributes: {},
  recognitionEnable: true,
  recognitionLang: 'pt',
  recognitionPlaceholder: 'Ouvindo ...',
  speechSynthesis: {
    enable: false,
    lang: 'pt',
    voice: null
  },
  style: {},
  submitButtonStyle: {},
  toggleFloating: undefined,
  userDelay: 1000,
  width: '490px',
  botAvatar: "data:image/jpeg;base64,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",
  userAvatar:
    "data:image/svg+xml,%3csvg viewBox='-208.5 21 100 100' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3e%3ccircle cx='-158.5' cy='71' fill='%23F5EEE5' r='50'/%3e%3cdefs%3e%3ccircle cx='-158.5' cy='71' id='a' r='50'/%3e%3c/defs%3e%3cclipPath id='b'%3e%3cuse overflow='visible' xlink:href='%23a'/%3e%3c/clipPath%3e%3cpath clip-path='url(%23b)' d='M-108.5 121v-14s-21.2-4.9-28-6.7c-2.5-.7-7-3.3-7-12V82h-30v6.3c0 8.7-4.5 11.3-7 12-6.8 1.9-28.1 7.3-28.1 6.7v14h100.1z' fill='%23E6C19C'/%3e%3cg clip-path='url(%23b)'%3e%3cdefs%3e%3cpath d='M-108.5 121v-14s-21.2-4.9-28-6.7c-2.5-.7-7-3.3-7-12V82h-30v6.3c0 8.7-4.5 11.3-7 12-6.8 1.9-28.1 7.3-28.1 6.7v14h100.1z' id='c'/%3e%3c/defs%3e%3cclipPath id='d'%3e%3cuse overflow='visible' xlink:href='%23c'/%3e%3c/clipPath%3e%3cpath clip-path='url(%23d)' d='M-158.5 100.1c12.7 0 23-18.6 23-34.4 0-16.2-10.3-24.7-23-24.7s-23 8.5-23 24.7c0 15.8 10.3 34.4 23 34.4z' fill='%23D4B08C'/%3e%3c/g%3e%3cpath d='M-158.5 96c12.7 0 23-16.3 23-31 0-15.1-10.3-23-23-23s-23 7.9-23 23c0 14.7 10.3 31 23 31z' fill='%23F2CEA5'/%3e%3c/svg%3e",

};

class SimpleForm extends Component {
  constructor(props) {
    super(props);
    const { conta } = this.props;
    this.state = { conta };
  }
  verificaHora() {
    var stamp = new Date();
    var time;
    var hours = stamp.getHours();
    if (hours >= 18 && hours < 24) {
      time = "Boa noite! Bem-vindo à Central de Cobrança BRB. Atendimento BRB Serviços";
    }

    if (hours >= 12 && hours < 18) {
      time = "Boa tarde! Bem-vindo à Central de Cobrança BRB. Atendimento BRB Serviços";
    }

    if (hours >= 0 && hours < 12) {
      time = "Bom dia! Bem-vindo à Central de Cobrança BRB. Atendimento BRB Serviços";
    }
    return time
  }
  render() {
    return (
      <ThemeProvider theme={theme}>
        <ChatBot
          steps={[
            {
              id: 'intro',
              message: this.verificaHora(),
              trigger: 'intro2',
            },
            {
              id: 'intro2',
              message: 'O que você deseja fazer agora?',

              trigger: 'menu1',
            },
            {
              id: 'menu1',
              options: [
                { value: '1', label: 'Negocie sua dívidas', trigger: 'verificarDivida' },
                { value: '2', label: 'Boleto 2ª Via', trigger: 'gerarBoleto' },
                { value: '3', label: 'Digite sua senha', trigger:'Password'},
              ]
            },
            {
            id:'Password',
            user: true,
            secureTextEntry: true,
            trigger: 'verificarDivida'
            },
            {
              id: 'verificarDivida',
              message: 'Certo. Me informe o seu CPF com onze dígitos ou CNPJ com 14 dígitos (apenas números):',
              trigger: 'userCPF',
            },
             {
              id: 'maisDeUmaDivida',
              message: 'Favor, insira os quatros últimos digítos do seu cartão:',
              trigger: 'userCartao',
            },
            {
              id: 'userCPF',
              user: true,
              validator: (value) => {
                if (!isNaN(value) && (value.length === 11 || value.length === 14)) {
                  return true;
                }
                return 'CPF ou CNPJ inválido! Digite novamente.';
                
              },
              trigger: 'consultaDividaAtiva',
            },
            {
              id: 'userCartao',
              user: true,
              validator: (value) => {
                if (isNaN(value) || value.length > 4 || value.length < 4) {
                  return 'Número do cartão inválido! Digite novamente.';
                }
                return true;
              },
              trigger: 'consultaDividaAtiva',
            },
            {
              id: 'pergunta_Menu_Quitacao_Simulacao',
              message: 'O que você deseja fazer agora?',
              trigger: 'menu_quitacao_simulacao',
            },
            {
              id: 'menu_quitacao_simulacao',
              options: [
                { value: '1', label: 'Quitar dívida', trigger: 'Quitar_Negociacao' },
                { value: '2', label: 'Simular parcelamento da dívida', trigger: 'simularDivida' },
              ]
            },
            {
              id: 'menu_efetivar_simulacao',
              options: [
                { value: '1', label: 'Efetivar a negociação', trigger: 'Efetiva_Negociacao' },
                { value: '2', label: 'Simular novamente', trigger: 'simularDivida' },
              ]
            },
            {
              id: 'op_indisponivel',
              message: 'Operação indisponível no momento. Tente novamente mais tarde.',
              trigger: 'pergunta_Encerrar_Voltar_Menu_inicial',
            },
            {
              id: 'simularDivida',
              message: 'Legal. Me informe por gentileza o valor da entrada sendo, no minímo, 10% do valor total da dívida',
              trigger: 'userValorEntrada',
            },
            {
              id: 'userValorEntrada',
              user: true,
              validator: (value) => {
                if (!/^[\d.,?!]+$/.test(value)) {
                  return 'Valor inválido! Digite novamente.';
                }
                return true;
              },
              trigger: 'infoDigiteValorParcela',
            },
            {
              id: 'infoDigiteValorParcela',
              message: 'Agora, me informe o número de parcelas de no máximo 48 vezes em que deseja parcelar o saldo remanescente.',
              trigger: 'userQtdParcela',
            },
            {
              id: 'Inf_Simular_Efetivar',
              message: 'Deseja efetivar a renegociação, ou fazer uma nova simulação?',
              trigger: 'menu_efetivar_simulacao',
            },
            {
              id: 'userQtdParcela',
              user: true,
              validator: (value) => {
                if (isNaN(value) || value.length > 3 || value > 48) {
                  return 'Número de pacerlas inválido! Digite novamente.';
                }
                return true;
              },
              trigger: 'GerarSimulacao',
            },
            {
              id: 'gerarBoleto',
              message: 'Entendi. Me informe o número da sua conta, com 16 dígitos (apenas números):',
              trigger: 'userConta',
            },
            {
              id: 'userConta',
              user: true,
              validator: (value) => {
                if (isNaN(value) || value.length > 16 || value.length < 16) {
                  return 'Número da conta inválido! Digite novamente.';
                }
                return true;
              },
              trigger: 'mensagem_Emissao_De_Boleto',
            },
            {
              id: 'mensagem_Emissao_De_Boleto',
              message: 'Que tipo de boleto você deseja gerar?',
              trigger: 'emissao_De_boleto',
            },
            {
              id: 'emissao_De_boleto',
              options: [
                { value: '1', label: 'Boleto da fatura do seu cartão', trigger: 'diaVencimentoBoleto' },
                { value: '2', label: 'Boleto para entrada de parcelamento de saldo devedor', trigger: 'diaVencimentoBoleto' },
                { value: '3', label: 'Boleto para quitação total do saldo devedor', trigger: 'diaVencimentoBoleto' },
                { value: '4', label: '2ª via de boleto', trigger: 'diaVencimentoBoleto' },
              ]
            },
            {
              id: 'diaVencimentoBoleto',
              message: 'Qual é a melhor data para o vencimento? Informe no formato DD/MM/AAAA (apenas números)',
              trigger: 'userDiaVencimento',
            },
            {
              id: 'userDiaVencimento',
              user: true,
              validator: (value) => {
                if (!/^(?:(?:31(\/|-|\.)(?:0?[13578]|1[02]))\1|(?:(?:29|30)(\/|-|\.)(?:0?[1,3-9]|1[0-2])\2))(?:(?:1[6-9]|[2-9]\d)?\d{2})$|^(?:29(\/|-|\.)0?2\3(?:(?:(?:1[6-9]|[2-9]\d)?(?:0[48]|[2468][048]|[13579][26])|(?:(?:16|[2468][048]|[3579][26])00))))$|^(?:0?[1-9]|1\d|2[0-8])(\/|-|\.)(?:(?:0?[1-9])|(?:1[0-2]))\4(?:(?:1[6-9]|[2-9]\d)?\d{2})$/.test(value)) {
                  return 'Data inválida! Digite novamente.';
                }
                return true;
              },
              trigger: 'consultaBoleto',
            },
            // {
            //   id: 'userDiaVencimento',
            //   user: true,
            //   validaData(value) => {
            //     var date_regex = /^(0[1-9]|1[0-2])\/(0[1-9]|1\d|2\d|3[01])\/(0[1-9]|1[1-9]|2[1-9])$/;

            //     if (date_regex.test(value))
            //     return true;
            //   },
            //   trigger: 'consultaBoleto',
            // },
            // {
            //   id: 'mesVencimento',
            //   message: 'Me informe por favor o mês de vencimento, com dois dígitos (somente números)',
            //   trigger: 'userMesVencimento',
            // },
            // {
            //   id: 'userMesVencimento',
            //   user: true,
            //   validator: (value) => {
            //     if (isNaN(value) || value.length > 2 || value > 12) {
            //       return 'Data inválida! Digite novamente.';
            //     }
            //     return true;
            //   },
            //   trigger: 'anoVencimento',
            // },
            // {
            //   id: 'anoVencimento',
            //   message: 'Informe o ano de vencimento com quatro dígitos:',
            //   trigger: 'userAnoVencimento',
            // },
            // {
            //   id: 'userAnoVencimento',
            //   user: true,
            //   validator: (value) => {
            //     if (isNaN(value) || value.length > 4) {
            //       return 'Data inválida! Digite novamente.';
            //     }
            //     return true;
            //   },
            //   trigger: 'consultaBoleto',
            // },
       
            {
              id: 'consultaDividaAtiva',
              component: <Post />,
              asMessage: true,
              waitAction: true,
            },
            {
              id: 'GerarSimulacao',
              component: <Simulacao />,
              asMessage: true,
              waitAction: true,
            },
            {
              id: 'consultaBoleto',
              component: <Boleto />,
              asMessage: true,
              waitAction: true,
            },
            {
              id: 'gera_boleto_negociado',
              component: <BoletoNegociado />,
              asMessage: true,
              waitAction: true,
            },
            {
              id: 'Efetiva_Negociacao',
              component: <ConfirmaRenegociacao />,
              asMessage: true,
              waitAction: true,
            },
            {
              id: 'Quitar_Negociacao',
              component: <ConfirmaQuitacao />,
              asMessage: true,
              waitAction: true,
            },
            {
              id: 'Efetiva_Quitacao',
              component: <EfetivaQuitacao />,
              asMessage: true,
              waitAction: true,
            },
            {
              id: 'Efetiva_Renegociacao',
              component: <EfetivaRenegociacao />,
              asMessage: true,
              waitAction: true,
            },
            {
              id: 'notifica_sms',
              component: <NotificaSms />,
              asMessage: true,
              waitAction: true,
            },
            {
              id: 'notifica_email',
              component: <NotificaEmail />,
              asMessage: true,
              waitAction: true,
            },

            {
              id: 'user_Numero_Celular',
              user: true,
              validator: (value) => {
                if (isNaN(value) || value.length > 11 || value.length < 11) {
                  return 'Número inválida! Digite novamente.';
                }
                return true;
              },
              trigger: 'notifica_sms',
            },
            {
              id: 'p_Quitar',
              message: 'O senhor(a) confirma?',
              trigger: 'op_Sim_Nao_Quitar',
            },
            {
              id: 'op_Sim_Nao_Quitar',
              options: [
                { value: '1', label: 'Sim', trigger: 'Efetiva_Quitacao' },
                { value: '2', label: 'Não', trigger: 'pergunta_Encerrar_Voltar_Menu_inicial' },
              ]
            },
            {
              id: 'p_Renegociacao',
              message: 'O senhor(a) confirma?',
              trigger: 'op_Sim_Nao_Renegociacao',
            },
            {
              id: 'op_Sim_Nao_Renegociacao',
              options: [
                { value: '1', label: 'Sim', trigger: 'Efetiva_Renegociacao' },
                { value: '2', label: 'Não', trigger: 'pergunta_Encerrar_Voltar_Menu_inicial' },
              ]
            },
            {
              id: 'p_Notificacao',
              message: 'Você deseja receber a linha digitável por SMS em seu celular, ou no seu e-mail?',
              trigger: 'op_Sim_Nao',
            },
            {
              id: 'op_Sim_Nao',
              options: [
                { value: '1', label: 'Sim', trigger: 'escolha_Opcao_Envio' },
                { value: '2', label: 'Não', trigger: 'pergunta_Encerrar_Voltar_Menu_inicial' },
              ]
            },
            {
              id: 'GeraBoleto_negociado',
              message: 'Aguarde mais alguns instantes enquanto gero o seu boleto',
              trigger: 'gera_boleto_negociado',
            },

            {
              id: 'user_Email',
              user: true,
              trigger: 'notifica_email',
            },
            {
              id: 'escolha_Opcao_Envio',
              message: 'Onde deseja receber?',
              trigger: 'opcao_Envio',

            },
            {
              id: 'opcao_Envio',
              options: [
                { value: '1', label: 'SMS em seu celular', trigger: 'user_Id_numero_Cel' },
                { value: '2', label: 'E-Mail', trigger: 'user_Id_Email' },
              ]
            },
            {
              id: 'user_Id_Email',
              message: 'Informe o seu E-mail',
              trigger: 'user_Email',
            },
            {
              id: 'user_Id_numero_Cel',
              message: 'Informe o número do seu celular com DDD',
              trigger: 'user_Numero_Celular',
            },
            {
              id: 'op_Sim_Nao_Retorno_sms',
              options: [
                { value: '1', label: 'Sim', trigger: 'opcao_Envio_Email' },
                { value: '2', label: 'Não', trigger: 'pergunta_Encerrar_Voltar_Menu_inicial' },
              ]
            },
            {
              id: 'deseja_Envio_SMS',
              message: 'Deseja que seja enviado também para o seu celular?',
              trigger: 'op_Sim_Nao_Retorno_email',
            },
            {
              id: 'op_Sim_Nao_Retorno_email',
              options: [
                { value: '1', label: 'Sim', trigger: 'user_Id_numero_Cel' },
                { value: '2', label: 'Não', trigger: 'pergunta_Encerrar_Voltar_Menu_inicial' },
              ]
            },
            {
              id: 'opcao_Envio_sms',
              options: [
                { value: '1', label: 'SMS', trigger: 'user_Numero_Celular' },
              ]
            },
            {
              id: 'deseja_Envio_Email',
              message: 'Deseja que seja enviado também para o seu E-mail?',
              trigger: 'op_Sim_Nao_Retorno_sms',
            },
            {
              id: 'op_Sim_Nao_Retorno_sms',
              options: [
                { value: '1', label: 'Sim', trigger: 'user_Id_Email' },
                { value: '2', label: 'Não', trigger: 'pergunta_Encerrar_Voltar_Menu_inicial' },
              ]
            },

            {
              id: 'opcao_Envio_Email',
              options: [
                { value: '2', label: 'E-Mail', trigger: 'mensagem_Envio' },
              ]
            },
            {
              id: 'mensagem_Envio',
              message: 'Pronto! A linha digitável do seu boleto já foi enviada.',
              trigger: 'pergunta_Encerrar_Voltar_Menu_inicial',
            },
            {
              id: 'pergunta_Encerrar_Voltar_Menu_inicial',
              message: 'Posso te ajudar em mais alguma coisa?',
              trigger: 'Encerrar_Voltar_Menu_inicial',
            },
            {
              id: 'pergunta_Encerrar_Voltar_Menu_inicial_Refazer_Boleto',
              message: 'Posso te ajudar em mais alguma coisa?',
              trigger: 'Encerrar_Voltar_Menu_inicial_Refazer_Boleto',
            },
            {
              id: 'Encerrar_Voltar_Menu_inicial_Refazer_Boleto',
              options: [
                { value: '1', label: 'Voltar ao Menu Inicial', trigger: 'menu1' },
                { value: '2', label: 'Tentar novamente', trigger: 'gerarBoleto' },
                { value: '3', label: 'Encerrar Atendimento', trigger: 'Final' },
              ]
            },
            {
              id: 'Encerrar_Voltar_Menu_inicial',
              options: [
                { value: '1', label: 'Voltar ao Menu Inicial', trigger: 'menu1' },
                { value: '2', label: 'Encerrar Atendimento', trigger: 'Final' },
              ]
            },
            {
              id: 'Final',
              message: 'A BRB Serviços agradece seu contato!',
              end: true,
            },
          ]}
        />
      </ThemeProvider>
    );
  }
  contas(conta) {
    console.log(this.state.conta);
    const novosComentarios = this.state.conta;
    this.setState({ conta: novosComentarios });
  }

}

export default SimpleForm;