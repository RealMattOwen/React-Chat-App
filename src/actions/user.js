// SET_DETAILS
export const setDetails = (details = {
    displayName: 'Anonymous',
    email: 'N/A',
    photoURL: 'https://lh3.googleusercontent.com/-XdUIqdMkCWA/AAAAAAAAAAI/AAAAAAAAAAA/4252rscbv5M/photo.jpg'
}) => ({
    type: 'SET_DETAILS',
    details
});