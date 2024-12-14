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
