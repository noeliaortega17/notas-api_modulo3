export default class AuthController {
    constructor({ authService }) {
        this.authService = authService;
    }

    register = async (req, res) => {
        try {
            const result = await this.authService.register(req.body);
            res.status(201).json({
                success: true,
                data: result
            });
        } catch (error) {
            res.status(400).json({
                success: false,
                error: {
                    title: "Bad Request",
                    description: error.message
                }
            });
        }
    };

    login = async (req, res) => {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                success: false,
                error: {
                    title: "Bad Request",
                    description: "Email and password are required"
                }
            });
        }

        try {
            const result = await this.authService.login(req.body);
            res.status(200).json({
                success: true,
                data: result
            });
        } catch (error) {
            res.status(401).json({
                success: false,
                error: {
                    title: "Unauthorized",
                    description: error.message
                }
            });
        }
    };
}