
const posts = async (req, res) => {
    const resposne = {
        success: true,
        posts: [
            {
                id: 1,
                category: 'Matematyka',
                text: 'Lorem ipsum 1'
            },
            {
                id: 2,
                category: 'WF',
                text: 'Lorem ipsum 2'
            }
        ],
    };
    
    return res.status(200).json(resposne);
};

module.exports = {
    posts,
};