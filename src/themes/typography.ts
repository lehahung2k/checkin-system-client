import { JsonObject } from 'type-fest';

export default function themeTypography(theme: JsonObject): Record<string, any> {
    return {
        mediumAvatar: {
            width: '34px',
            height: '34px',
            fontSize: '1.2rem'
        },
    }
}