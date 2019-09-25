var etapa = 1;
var etapaTres = function(){
   etapa = 3;
}
var criaJogo = function (sprite) {


    var lacunas = [];
    var palavraSecreta = '';



    var criaLacunas = function (palavraSecreta) {
        var split = palavraSecreta.split("-");

        for (let i = 0; i < palavraSecreta.length; i++) {

            lacunas.push('');

        }

    };
    var proximaEtapa = function () {

        etapa = 2;
    };



    var setPalavraSecreta = function (palavra) {
        palavra = palavra.replace(/( )+/g, "-");
        console.log("replace: "+palavra);
        if(!palavra.trim()) throw Error('Palavra inválida');

          palavraSecreta = palavra;
          criaLacunas(palavraSecreta);
          proximaEtapa();


    };

    var getLacunas = function () {

        return lacunas;
    };

    var getEtapa = function () {

        return etapa;
    };

    var processaChute = function (chute) {
        if(!chute.trim()) throw Error('Chute inválido');
        var exp = new RegExp(chute, 'gi')
            , resultado
            , acertou = false;

        while (resultado = exp.exec(palavraSecreta))
            acertou = lacunas[resultado.index] = chute;

        if (!acertou){
            sprite.nextFrame();
            var ch = $("#chutes").text();
            $("#chutes").text(ch+", "+chute).removeClass("invisivel");
        }
    };

    var ganhou = function () {

        return lacunas.length
            ? !lacunas.some(function(lacuna) {
                return lacuna == '';
            })
            : false;
    };


    var perdeu = function () {

        return sprite.isFinished();
    };

    var ganhouOuPerdeu = function () {

        return ganhou() || perdeu();
    };

    var reinicia = function () {

        etapa = 1;
        palavraSecreta = '';
        lacunas = [];
        sprite.reset();
    };

    return {
        setPalavraSecreta: setPalavraSecreta,
        getLacunas: getLacunas,
        getEtapa: getEtapa,
        processaChute: processaChute,
        ganhou: ganhou,
        perdeu: perdeu,
        ganhouOuPerdeu: ganhouOuPerdeu,
        reinicia: reinicia
    }
};
