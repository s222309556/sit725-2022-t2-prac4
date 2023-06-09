// const cardList = [
//     {
//         title: "Kitten 2",
//         image: "images/kitten-2.jpg",
//         link: "About Kitten 2",
//         desciption: "Demo desciption about kitten 2"

//     },
//     {
//         title: "Kitten 3",
//         image: "images/kitten-3.jpg",
//         link: "About Kitten 3",
//         desciption: "Demo desciption about kitten 3"
//     }
// ]


// make get request to the server to recieve the data
const getCats = () => {
    $.get('/api/cats', (response) => {
        if(response.statusCode==200){
            addCards(response.data);
        }
    })
}


const clickMe = () => {
    alert("Thanks for clicking me. Hope you have a nice day!")

}

const submitForm = () => {
    let formData = {};
    formData.title = $('#title').val();
    formData.image = $('#image').val();
    formData.link = $('#link').val();
    formData.description = $('#description').val();
    
    console.log("Form Data Submitted: ", formData);
    // tell the server to save this to DB
    try{
        addCat(formData);
    }catch(e){
        console.error(e);
    }

}

const addCat = (cat) => {
    $.ajax({
        url: '/api/cats',
        data: cat,
        type:'POST',
        success: (result) => {
            alert(result.message);
            location.reload();
        }  
    });
}

const addCards = (items) => {
    items.forEach(item => {
        let itemToAppend = '<div class="col s4 center-align">'+
    '<div class="card medium"><div class="card-image waves-effect waves-block waves-light"><img class="activator" src="'+item.image+'">'+
    '</div><div class="card-content">'+
    '<span class="card-title activator grey-text text-darken-4">'+item.title+'<i class="material-icons right">more_vert</i></span><p><a href="#">'+item.link+'</a></p></div>'+
    '<div class="card-reveal">'+
        '<span class="card-title grey-text text-darken-4">'+item.title+'<i class="material-icons right">close</i></span>'+
        '<p class="card-text">'+item.description+'</p>'+
      '</div></div></div>';
      $("#card-section").append(itemToAppend)
    });
}


$(document).ready(function () {
    $('.materialboxed').materialbox();
    $('#formSubmit').click(() => {
        submitForm();
    })
    // call getCats function
    getCats();
    // addCards(cardList);
    $('.modal').modal();
});