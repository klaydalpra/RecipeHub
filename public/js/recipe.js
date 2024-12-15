
document.addEventListener("DOMContentLoaded", () => {
    // Select all review ratings
    const reviewRatings = document.querySelectorAll(".review_list li:nth-child(3)");
    let totalRating = 0;
    let numberOfRatings = 0;

    reviewRatings.forEach((ratingElement) => {
        const ratingText = ratingElement.textContent; // E.g., "Rating: 5"
        const ratingValue = parseInt(ratingText.replace("Rating: ", ""), 10);
        if (!isNaN(ratingValue)) {
            totalRating += ratingValue;
            numberOfRatings++;
        }
    });

    // Calculate the average
    const averageRating = numberOfRatings > 0 ? (totalRating / numberOfRatings).toFixed(2) : 0;

    // Display the average rating
    const averageRatingElement = document.createElement("div");
    averageRatingElement.textContent = `Average Rating: ${averageRating}`;
    averageRatingElement.style.fontWeight = "bold";
    averageRatingElement.style.marginTop = "20px";
    document.querySelector(".recipe_container").appendChild(averageRatingElement);
});

let reviewForm = document.getElementById('add-review-form');
let reviewText = document.getElementById('reviewText');
let reviewRating = document.getElementById('reviewText');
let commentForms = document.querySelectorAll('.add-comment-form');
let commentTexts = document.querySelectorAll('.commentText');
let addCommentButtons = document.querySelectorAll('.add-comment-button');
let cancelCommentButtons = document.querySelectorAll('.cancel-comment-button');
let errors = [];

const checkText = (text) => {
    if (!text) errors.push('Must provide text');
    if (typeof text !== 'string') errors.push('Text must be a string');
    if (text.trim().length === 0) errors.push('Text must not be empty');
    if (text.length > 500 || text.length < 5) errors.push('Text must be between 5-500 characters long');
}

const checkRating = (rating) => {
    if (!rating) errors.push('Must provide a rating');
    if (rating.trim().length === 0) errors.push('Rating must not be empty');
    rating = parseInt(rating);
    if (typeof rating !== 'number') errors.push('Rating must be a number');
    if (rating > 10 || rating < 0) errors.push('Rating must be between 1-10');
}

if (reviewForm) {
    reviewForm.addEventListener('submit', (event) => {
        checkText(reviewText.value);
        checkRating(reviewRating.value);

        if (errors.length > 0) {
            event.preventDefault();
            let myDiv = document.createElement('div');
            for (let i = 0; i < errors.length; i++) {
                let myP = document.createElement('p');
                myP.classList.add('error');
                myP.innerHTML = errors[i];
                myDiv.appendChild(myP);
            };
            reviewForm.appendChild(myDiv);
            errors = [];
        };
    });
};

cancelCommentButtons.forEach(cancelCommentButton => {
    if (cancelCommentButton.hidden  === false) {
        cancelCommentButton.addEventListener('click', function() {
            cancelCommentButton.parentElement.hidden = true;
            cancelCommentButton.parentElement.previousElementSibling.hidden = false;
            location.reload();
        });
    };
});

addCommentButtons.forEach(addCommentButton => {
    addCommentButton.addEventListener('click', function() {
        addCommentButton.nextElementSibling.hidden = false;
        addCommentButton.hidden = true;
    });
});

commentForms.forEach(commentForm => {
    if (commentForm) {
        commentForm.addEventListener('submit', (event) => {
            checkText(commentForm.querySelector(".commentText").value);

            if (errors.length > 0) {
                event.preventDefault();
                let myDiv = document.createElement('div');
                for (let i = 0; i < errors.length; i++) {
                    let myP = document.createElement('p');
                    myP.classList.add('error');
                    myP.innerHTML = errors[i];
                    myDiv.appendChild(myP);
                };
                commentForm.appendChild(myDiv);
                errors = [];
            };
        });
    };
});