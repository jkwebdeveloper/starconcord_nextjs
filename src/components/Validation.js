import * as yup from 'yup'
export const contactValidation = {
    initialState: {
        name: "",
        email: "",
        phone: "",
        message: "",
    },
    schema: yup.object().shape({
        name: yup
            .string()
            // .min(4, "Name must be at least 4 characters")
            // .trim()
            .required("Name is required..."),
        email: yup.string().email().required("Email address is required..."),
        phone: yup.string().trim().required("Phone is required..."),
        message: yup.string().trim().required("Message is required..."),
    }),
};

const ValidationSchema = () => {
    const careerApplySchema = yup.object().shape({
        firstname: yup.string().required("Name is required..."),
        lastname: yup.string().required("LastName is required..."),
        email: yup.string().email().required("Email address is required..."),
        mobile: yup.string().required("Phone is required..."),
        location: yup.string().required("location is required..."),
        jobId: yup.string().required("job is required..."),
        resume: yup
            .mixed()
            .required("resume is required...")
            .test("fileSize", "File should be less than 2 MB!!!", (value) => {
                return value && value[0].size <= 2_000_000;
            })
            .test(
                "type",
                "Only the following formats are accepted: .pdf, .doc, .docx",
                (value) => {
                    return (
                        value &&
                        (value[0].type === "application/pdf" ||
                            value[0].type === "application/msword" ||
                            value[0].type ===
                            "application/vnd.openxmlformats-officedocument.wordprocessingml.document")
                    );
                }
            ),
    })
    return {
        careerApplySchema,
    };
}
export default ValidationSchema;