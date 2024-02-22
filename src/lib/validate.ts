import { UnauthorizedException } from "@nestjs/common";
import { response } from "src/helpers/data";

export const validate = (data: any, rules: any) => {
    const errors: any = {};
    const fields = Object.keys(rules);

    fields.map((field, index) => {
        const rule = rules[field];
        const value = data[field];
        if (rule.required && !value) {
            errors[field] = `${field} is required`;
        }
        if (rule.min && value.length < rule.min) {
            errors[field] = `${field} must be longer than ${rule.min} characters`;
        }
        if (rule.max && value.length > rule.max) {
            errors[field] = `${field} must be shorter than ${rule.max} characters`;
        }
        if (rule.isEmail && !value.match(/^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/)) {
            errors[field] = `${field} field must be an email`;
        }
        if (rule.isNumeric && isNaN(Number(value))) {
            errors[field] = `${field} must be numeric`;
        }
    })
    return Object.keys(errors).length > 0 ? errors : null;
}

export const validateApiKey = async (apiKey: string | null, users: any) => {
    const validation = validate({ apiKey: apiKey }, { apiKey: { required: true } });
    if (validation) {
        return response(validation, 'error');
    }
    const user = await users.find({ where: { apiKey: apiKey } });
    if (!user || user.length == 0) {
        throw new UnauthorizedException()
    }
    return user;
}