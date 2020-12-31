class ToggleLike{
    constructor(toggleElement){
        this.toggler = toggleElement;
        this.togglerLike();
    }
    


    toggleLike(){
        $(this.toggler).click(function(e){
            e.preventDefault();
            let self=this;
            // this is a new way of writing ajax which you might have studied, it looks like same as promises
            $.ajax({
                type: "post",
                url : $(self).attr('href'),
            })
            .done(function(data){
                let likesCount= parseInt($(self).attr('data-likes'));
                console.log(likesCount);
                if(data.data.deleted == true){
                    likesCount -=1;
                }else{
                    likesCount +=1;
                }
                $(self).attr('data-likes',likesCount);
                $(self).html(`${likesCount} Likes`);
            })
            .fail(function(errData){
                console.log('error in completing the request');
            });
        });
    }
};
class Toggleadd{
    constructor(toggleadd){
        this.toggle=toggleadd;
        this.Addremove();
    }
    Addremove(){
        $(this.toggle).click(function(e){
           // e.preventDefault();
           console.log('hiiiiiiiiii');
            let self = this;
            $.ajax({
                type: "POST",
                url : $(self).attr('href'),
            })
             .done(function(data){
                  if(data.data.added == true){
                       let textAdd = $(self).attr('data-add');
                       
                       textAdd= 'remove';
                       $(self).attr('data-add',textAdd);
                       $(self).html(`${1} Likes`);
                  }
             })
        })
    }
}