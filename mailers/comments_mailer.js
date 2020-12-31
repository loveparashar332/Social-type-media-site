const nodeMailer=require('../config/nodemailer');


module.exports.newComment = (comment) => {
    let htmlString = nodeMailer.renderTemplate({comment: comment}, '/comment/new_comment.ejs');
    console.log('Inside newComment mailer');
    console.log(comment.user.email);
    nodeMailer.transporter.sendMail({
        from: 'dr.kushparashar1103@gmail.com',
        to: comment.user.email,
        subject: 'New Comment Published!!',
        html: htmlString
    },(err,info) => {
        console.log('************',info);
        if(err){
            console.log('error in sending mail',err);
            return;
        }
        console.log('message sent',info);
        return;
    });
}
module.exports.newPost = function(post){
    let htmlString= nodeMailer.renderTemplate({post: post}, '/post/new_post.ejs');
    console.log('inside newpost mailer');
    console.log(post.user.email);
    nodeMailer.transporter.sendMail({
        from: 'dr.kushparashar1103@gmail.com',
        to: post.user.email,
        subject: 'New Post Published!!',
        html: htmlString
    },(err,info) => {
        console.log('************',info);
        if(err){
            console.log('error in sending mail',err);
            return;
        }
        console.log('message sent',info);
        return;
    });

}