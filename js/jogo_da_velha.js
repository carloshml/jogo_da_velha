const jogoDaVelha = {
    draw: function (){
        let content = '';  
        for ( i in this.board){
            content += '<div class="block" id="block'+i+'" onclick="jogoDaVelha.make_play('+i+')">'+this.board[i] +'</div>';
        }   
        this.container_element.innerHTML = content;
    },
    drawVencedora: function (sequencia){
        for ( i in sequencia){
         console.log(document.getElementById('block'+sequencia[i]).classList.add('vencedores'));             
        }   
    },
    init: function (container){        
        this.container_element = container;
    },
    board : ['','','','','','','','',''],
    simbols :{
        options:['X','O'],
        turn_index:0,
        change:function(){
            this.turn_index  = ( this.turn_index === 0? 1:0);
        }
    },
    container_element:null,
    gameover: false,
    winning_sequence:[
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]    
    ],
    reiniciar: function (){
        this.board = ['','','','','','','','',''];  
        this.draw();
    } ,
    gameIsOver: function(){
        this.gameover = true;
        console.log('GAME OVER ');
        setTimeout(() => {
            this.reiniciar();
        }, 5000);
    },
    make_play: function(position){
        console.log('========', position );
        if(this.gameover){ return false;}
        if(this.board[position]=== ''){
           this.board [position] = this.simbols.options[this.simbols.turn_index];
           this.draw();
           let winning_sequence_index = this.checkWinningSequence(this.simbols.options[this.simbols.turn_index]);
            if (winning_sequence_index>=0){
                this.gameIsOver();
            } else{
                this.simbols.change(); 
            }
            return true;          
        } else {
            return false;
        }
    },
      checkWinningSequence: function(simbol){
        for(i in this.winning_sequence){
            if( this.board[this.winning_sequence[i][0]] === simbol &&  
                this.board[this.winning_sequence[i][1]] === simbol &&
                this.board[this.winning_sequence[i][2]] === simbol
                ){
                    console.log('sequencia vencedora'); 
                    console.log(this.winning_sequence[i]); 
                    this.drawVencedora(this.winning_sequence[i]);
                    return i;                  
                }
        }
        return -1;
    }    
};