var counts = new Map();
counts.set('interest1',0);
counts.set('interest2',0);
counts.set('interest3',0);

function check(){
    console.log("check");
}

function addCard(interestID) {
    console.log(interestID);
    counts.set(interestID, counts.get(interestID) + 1);
    document.getElementById(interestID).innerHTML += `
        <div style='display: flex' id='` + interestID + `tweet` + counts.get(interestID) + `'>
            <a class="btn btn-danger btn-sm ml-auto" role="button" onclick="removeCard('` + interestID + `tweet` + counts.get(interestID) + `')" style="border-radius: 20em;"></a>
            <div class="card" style="width: 18rem;">
                <img class="card-img-top" src="C:\Users\Owner\OneDrive\Documents\CSCI 3308\HW2\124021.png" alt="Twitter Logo" height="300px">
                <div class="card-body">
                    <h5 class="card-title">Tweet</h5>
                    <p class="card-text">Sample tweet will go here!</p>
                </div>
            </div>
        </div>
    `;  
}

function removeCard(tweetID){
    document.getElementById(tweetID).remove();
}