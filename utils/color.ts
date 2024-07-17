import colors from '../assets/scss/export/_colors.module.scss'

export function getColorValue(color: string) {
    return colors['color-' + color]
}
