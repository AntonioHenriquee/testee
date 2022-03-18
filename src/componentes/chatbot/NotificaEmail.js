import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Loading } from 'react-simple-chatbot';
import Globais from './Globais';

class NoficiaEmail extends Component {
  constructor(props) {
    super(props);
    const { steps } = this.props;
    const { user_Email, linhaDigitavel, user_Numero_Celular} = steps;

    this.state =  {user_Email, linhaDigitavel,user_Numero_Celular, loading: true, trigger: false, }; 
    this.triggetNext = this.triggetNext.bind(this);
}


async componentDidMount() {
    const self = this;
    const userObject = {
        user_Email:this.state.user_Email.value,
        user_Numero_Celular:this.state.user_Numero_Celular,
        linhaDigitavel: Globais.linhaDigitavel
        };        
        var headers = new Headers();
        headers.append('Authorization', 'Basic ' + btoa('barramento:QnJiMTIzNDU2Nzg='));
        await fetch('https://desenvolvimento.brbservicos.com.br/BarramentoNotifica/api/Notifica/EnviaEmailGet?Destinatario='+userObject.user_Email+'&Assunto=BRB SERVICO – COBRANCA [NÃO RESPONDA]&Corpo=Segue linha digital do seu boleto disponível para pagamento em qualquer agencia bancaria ou internet banking: '+userObject.linhaDigitavel+'&Copias', { headers: headers })
            .then(response => response.json())
            .then(data => this.setState({ retorno: data }));
        if(userObject.user_Numero_Celular === undefined){
          self.setState({ loading: false, result: "Pronto! A linha digitável do seu boleto já foi enviada para "+userObject.user_Email,caminho: "deseja_Envio_SMS" });
        }else{
          self.setState({ loading: false, result: "Pronto! A linha digitável do seu boleto já foi enviada para "+userObject.user_Email,caminho: "pergunta_Encerrar_Voltar_Menu_inicial" });    
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
    const { loading, result } = this.state;
    return (
        <div>
        { loading ? <Loading /> : result }
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

  NoficiaEmail.propTypes = {
    steps: PropTypes.object,
    triggerNextStep: PropTypes.func,
  };
  
  NoficiaEmail.defaultProps = {
    steps: undefined,
    triggerNextStep: undefined,
  };
  export default NoficiaEmail;