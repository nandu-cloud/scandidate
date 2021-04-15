const contactUsDAL = require('./contactUsDAL');
const AppError = require('../../helpers/appError');
const colors = require("../../helpers/colors");
const dataValidator = require('./contactUsValidator');
const path = require("path");
const ejs = require("ejs");
const email = require("../../helpers/emailMultiple");

module.exports.savecontactus = async (req, res, next) => {
    const data = req.body;
    try {
        await dataValidator.contactUsCreationSchema.validateAsync(data);
        let result = await contactUsDAL.saveContactUs(data);
        if (!result) return next(new AppError('Something went wrong', 400));
        let template = data;
        template.toemail = process.env.FIRSTPERSONID;
        template.logo = `${process.env.FRONT_END_URL}/logo1.png`;
        template.toemailsecondary = process.env.SECONDPERSONID;
        template.subject = "Contact us form details";

        try {
            template.html = await ejs.renderFile(
                path.join(
                    __dirname,
                    "../../helpers/email-templates/conatactUs-Email.ejs"
                ),
                template
            );
            // Email sending
            email.sendEmail(template).then(info => {
                console.log(info.MessageId);
                return res.status(200).json({ status: 200, message: "Thank you for contacting us, email sent sucessfully" })
            }).catch(err => {
                console.log(colors.yellow, err);
                return res.status(400).json({ status: 400, message: "Unable to sent, please contact us again!!" })
            })

        } catch (err) {
            console.log(colors.red, err);
            return next(new AppError('Error rendering', 400));
        }

    } catch (err) {
        console.log(colors.red, err);
        return next(new AppError(err, 400))
    }
}