import PostRepository from "../../repositories/postRepository.js"

const postRepository = new PostRepository()

export const contentController = {
    getAllContent: async (req, res) => {
        try {
            let contentData = await postRepository.getAllContent()
            res.status(200).send(contentData)
        } catch (error) {
            console.log(error.message);
            res.status(500).send({ error: 'internal server error' })
        }
    },
    archiveContent: async (req, res) => {
        try {
            const contentId = req.body.contentId
            const contentData = await postRepository.findById(contentId)
            let newContent;
            if (contentData.archive === false) {
                newContent = await postRepository.archiveContent(contentId)
            } else {
                newContent = await postRepository.unArchiveContent(contentId)
            }
            res.status(200).send(newContent)
        } catch (error) {
            console.log(error.message);
            res.status(500).send({ error: "Internal server error" })
        }
    }
}