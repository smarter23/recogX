import React, {Component} from 'react';


class Analyze extends React.Component {

    constructor(props){
        super(props);
    }

    componentDidMount(){
        (function(d, m){
            var kommunicateSettings = {"appId":"5b303429df6b9bf5c770f56929772dea","popupWidget":true,"automaticChatOpenOnNavigation":true};
            var s = document.createElement("script"); s.type = "text/javascript"; s.async = true;
            s.src = "https://widget.kommunicate.io/v2/kommunicate.app";
            var h = document.getElementsByTagName("head")[0]; h.appendChild(s);
            window.kommunicate = m; m._globals = kommunicateSettings;
          })(document, window.kommunicate || {});
    }
    render() {
      return (
          <div></div>
      )
    }
}

export default Analyze;