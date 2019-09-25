var criaController = function (jogo) {

    let palavraSecreta;
    var $entrada = $('.entrada');
    var $lacunas = $('.lacunas');
    var festa = document.getElementById('festa');;
    var burro = document.getElementById('burro');;

    var exibeLacunas = function () {
        $lacunas.empty();
        jogo.getLacunas().forEach(function (lacuna) {
            $('<li>')
                .addClass('lacuna')
                .text(lacuna)
                .appendTo($lacunas);
        });
    };

    var mudaPlaceHolder = function (texto) {

        $entrada.attr('placeholder', texto);
    };

    var guardaPalavraSecreta = function () {

        try {
            palavraSecreta = $entrada.val().trim();
            jogo.setPalavraSecreta($entrada.val().trim());
            $entrada.val('');
            mudaPlaceHolder('Digite a DICA!');
            exibeLacunas();
        } catch(err) {
            alert(err.message);
        }

    };

    var reinicia = function() {

        jogo.reinicia();
        $lacunas.empty();
        mudaPlaceHolder('palavra-secreta');
    };

    var somGanhador = function(){
      festa.play();
      setTimeout(function(){
        alert("PARABÉNS FERA, JA PODE IR PRA TV!!!");
        festa.pause();
        festa.currentTime = 0;
      },1500);

    }
    var somPerdedor = function(){
      burro.play();
      setTimeout(function(){
          alert("PERDEU TROUXAAAAAA!!!!");
          burro.pause();
          burro.currentTime = 0;
      },1500);

    }
    var leChute = function () {
        var split = palavraSecreta.split(" ");
        console.log(split);
        try {
            if (split.length > 1) {
              console.log("entrou");
              jogo.processaChute('-');
              jogo.processaChute($entrada.val().trim().substr(0, 1));
              $entrada.val('');
              exibeLacunas();
            }else {
              console.log("entrou não");
              jogo.processaChute($entrada.val().trim().substr(0, 1));
              $entrada.val('');
              exibeLacunas();
            }


            if(jogo.ganhouOuPerdeu()) {

                setTimeout(function() {
                    if(jogo.ganhou()) {
                        somGanhador();
                    } else if (jogo.perdeu()) {
                        somPerdedor();
                    }
                    reinicia();
                    $("#chutes").addClass("invisivel").text("Erros:");
                }, 200);
            }
        } catch(err) {
            alert(err.message);
        }
    };
    var mostraDica = function(){
        var dica = $entrada.val();
        var divDica = $(".dica");
        divDica.text("DICA: "+dica);
        divDica.removeClass("invisivel");
        mudaPlaceHolder('chute');
        etapaTres();
        setTimeout(function(){
            divDica.addClass("invisivel");
            $entrada.val("");
        }, 3000);

    }


    var inicia = function () {

        $entrada.keypress(function (event) {
            if (event.which == 13) {
                switch (jogo.getEtapa()) {
                    case 1:
                        guardaPalavraSecreta();
                        break;
                    case 2:
                        mostraDica();
                        break;
                    case 3:
                        leChute();
                        break;
                }
            }
        });
    };

    return { inicia: inicia };
};
