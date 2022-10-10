exports.hello = async (req, res) => {
    res.status(200).json({ message: "success", data: "hello world" })
}