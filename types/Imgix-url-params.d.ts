export interface ImgixURLParams {
    ar: Ar
    auto: Auto
    "bg-remove": BgRemove
    "bg-remove-fallback": BgRemoveFallback
    bg: Bg
    "blend-align": BlendAlign
    "blend-alpha": BlendAlpha
    "blend-color": BlendColor
    "blend-crop": BlendCrop
    "blend-fit": BlendFit
    "blend-h": BlendH
    "blend-mode": BlendMode
    "blend-pad": BlendPad
    "blend-size": BlendSize
    "blend-w": BlendW
    "blend-x": BlendX
    "blend-y": BlendY
    blend: Blend
    blur: Blur
    "border-bottom": BorderBottom
    "border-left": BorderLeft
    "border-radius-inner": BorderRadiusInner
    "border-radius": BorderRadius
    "border-right": BorderRight
    "border-top": BorderTop
    border: Border
    bri: Bri
    ch: Ch
    chromasub: Chromasub
    colorquant: Colorquant
    colors: Colors
    con: Con
    "corner-radius": CornerRadius
    crop: Crop
    cs: Cs
    dl: Dl
    dpi: Dpi
    dpr: Dpr
    "duotone-alpha": DuotoneAlpha
    duotone: Duotone
    exp: Exp
    expires: Expires
    faceindex: Faceindex
    facepad: Facepad
    faces: Faces
    "fill-color": FillColor
    fill: Fill
    fit: Fit
    flip: Flip
    fm: Fm
    "fp-debug": FpDebug
    "fp-x": FpX
    "fp-y": FpY
    "fp-z": FpZ
    fps: Fps
    frame: Frame
    gam: Gam
    "gif-q": GifQ
    "grid-colors": GridColors
    "grid-size": GridSize
    h: H
    high: High
    htn: Htn
    hue: Hue
    interval: Interval
    invert: Invert
    iptc: Iptc
    loop: Loop
    lossless: Lossless
    "mark-align": MarkAlign
    "mark-alpha": MarkAlpha
    "mark-base": MarkBase
    "mark-fit": MarkFit
    "mark-h": MarkH
    "mark-pad": MarkPad
    "mark-rot": MarkRot
    "mark-scale": MarkScale
    "mark-tile": MarkTile
    "mark-w": MarkW
    "mark-x": MarkX
    "mark-y": MarkY
    mark: Mark
    "mask-bg": MaskBg
    mask: Mask
    "max-h": MaxH
    "max-w": MaxW
    "min-h": MinH
    "min-w": MinW
    monochrome: Monochrome
    nr: Nr
    nrs: Nrs
    orient: Orient
    "pad-bottom": PadBottom
    "pad-left": PadLeft
    "pad-right": PadRight
    "pad-top": PadTop
    pad: Pad
    page: Page
    palette: Palette
    "pdf-annotation": PdfAnnotation
    prefix: Prefix
    px: Px
    q: Q
    rect: Rect
    reverse: Reverse
    rot: Rot
    sat: Sat
    sepia: Sepia
    shad: Shad
    sharp: Sharp
    skip: Skip
    transparency: Transparency
    "trim-color": TrimColor
    "trim-md": TrimMd
    "trim-pad": TrimPad
    "trim-sd": TrimSd
    "trim-tol": TrimTol
    trim: Trim
    "txt-align": TxtAlign
    "txt-clip": TxtClip
    "txt-color": TxtColor
    "txt-fit": TxtFit
    "txt-font": TxtFont
    "txt-lead": TxtLead
    "txt-lig": TxtLig
    "txt-line-color": TxtLineColor
    "txt-line": TxtLine
    "txt-pad": TxtPad
    "txt-shad": TxtShad
    "txt-size": TxtSize
    "txt-track": TxtTrack
    "txt-width": TxtWidth
    "txt-x": TxtX
    "txt-y": TxtY
    txt: Txt
    "upscale-fallback": UpscaleFallback
    upscale: Upscale
    usm: Usm
    usmrad: Usmrad
    vib: Vib
    w: W
}

export interface Ar {
    display_name: string
    category: string
    available_in: string[]
    expects: Expect[]
    depends: string[]
    url: string
    short_description: string
}

export interface Expect {
    type: string
    strict_range: StrictRange
}

export interface StrictRange {
    min: number
}

export interface Auto {
    display_name: string
    category: string
    available_in: string[]
    expects: Expect2[]
    disallow_base64: boolean
    url: string
    short_description: string
}

export interface Expect2 {
    type: string
    possible_values: string[]
}

export interface BgRemove {
    display_name: string
    category: string
    available_in: string[]
    expects: Expect3[]
    default: boolean
    url: string
    short_description: string
}

export interface Expect3 {
    type: string
}

export interface BgRemoveFallback {
    display_name: string
    category: string
    available_in: string[]
    expects: Expect4[]
    default: boolean
    url: string
    short_description: string
}

export interface Expect4 {
    type: string
}

export interface Bg {
    display_name: string
    category: string
    available_in: string[]
    expects: Expect5[]
    default: string
    url: string
    short_description: string
}

export interface Expect5 {
    type: string
}

export interface BlendAlign {
    display_name: string
    category: string
    available_in: string[]
    expects: Expect6[]
    aliases: string[]
    depends: string[]
    url: string
    short_description: string
}

export interface Expect6 {
    type: string
    possible_values: string[]
}

export interface BlendAlpha {
    display_name: string
    category: string
    available_in: string[]
    expects: Expect7[]
    aliases: string[]
    default: number
    depends: string[]
    url: string
    short_description: string
}

export interface Expect7 {
    type: string
    strict_range: StrictRange2
}

export interface StrictRange2 {
    min: number
    max: number
}

export interface BlendColor {
    display_name: string
    category: string
    available_in: string[]
    expects: Expect8[]
    aliases: string[]
    url: string
    short_description: string
}

export interface Expect8 {
    type: string
}

export interface BlendCrop {
    display_name: string
    category: string
    available_in: string[]
    expects: Expect9[]
    aliases: string[]
    depends: string[]
    url: string
    short_description: string
}

export interface Expect9 {
    type: string
    possible_values: string[]
}

export interface BlendFit {
    display_name: string
    category: string
    available_in: string[]
    expects: Expect10[]
    aliases: string[]
    default: string
    depends: string[]
    url: string
    short_description: string
}

export interface Expect10 {
    type: string
    possible_values: string[]
}

export interface BlendH {
    display_name: string
    category: string
    available_in: string[]
    expects: Expect11[]
    aliases: string[]
    depends: string[]
    url: string
    short_description: string
}

export interface Expect11 {
    type: string
    strict_range: StrictRange3
}

export interface StrictRange3 {
    min: number
    max: number
}

export interface BlendMode {
    display_name: string
    category: string
    available_in: string[]
    expects: Expect12[]
    aliases: string[]
    default: string
    depends: string[]
    url: string
    short_description: string
}

export interface Expect12 {
    type: string
    possible_values: string[]
}

export interface BlendPad {
    display_name: string
    category: string
    available_in: string[]
    expects: Expect13[]
    aliases: string[]
    default: number
    depends: string[]
    url: string
    short_description: string
}

export interface Expect13 {
    type: string
    suggested_range: SuggestedRange
}

export interface SuggestedRange {
    min: number
}

export interface BlendSize {
    display_name: string
    category: string
    available_in: string[]
    expects: Expect14[]
    aliases: string[]
    depends: string[]
    url: string
    short_description: string
}

export interface Expect14 {
    type: string
    possible_values: string[]
}

export interface BlendW {
    display_name: string
    category: string
    available_in: string[]
    expects: Expect15[]
    aliases: string[]
    depends: string[]
    url: string
    short_description: string
}

export interface Expect15 {
    type: string
    strict_range: StrictRange4
}

export interface StrictRange4 {
    min: number
    max: number
}

export interface BlendX {
    display_name: string
    category: string
    available_in: string[]
    expects: Expect16[]
    aliases: string[]
    default: number
    depends: string[]
    url: string
    short_description: string
}

export interface Expect16 {
    type: string
    suggested_range: SuggestedRange2
}

export interface SuggestedRange2 {
    min: number
}

export interface BlendY {
    display_name: string
    category: string
    available_in: string[]
    expects: Expect17[]
    aliases: string[]
    default: number
    depends: string[]
    url: string
    short_description: string
}

export interface Expect17 {
    type: string
    suggested_range: SuggestedRange3
}

export interface SuggestedRange3 {
    min: number
}

export interface Blend {
    display_name: string
    category: string
    available_in: string[]
    expects: Expect18[]
    aliases: string[]
    url: string
    short_description: string
}

export interface Expect18 {
    type: string
}

export interface Blur {
    display_name: string
    category: string
    available_in: string[]
    expects: Expect19[]
    default: number
    url: string
    short_description: string
}

export interface Expect19 {
    type: string
    suggested_range: SuggestedRange4
}

export interface SuggestedRange4 {
    min: number
    max: number
}

export interface BorderBottom {
    display_name: string
    category: string
    available_in: string[]
    expects: Expect20[]
    depends: string[]
    url: string
    short_description: string
}

export interface Expect20 {
    type: string
    suggested_range: SuggestedRange5
}

export interface SuggestedRange5 {
    min: number
    max: number
}

export interface BorderLeft {
    display_name: string
    category: string
    available_in: string[]
    expects: Expect21[]
    depends: string[]
    url: string
    short_description: string
}

export interface Expect21 {
    type: string
    suggested_range: SuggestedRange6
}

export interface SuggestedRange6 {
    min: number
    max: number
}

export interface BorderRadiusInner {
    display_name: string
    category: string
    available_in: string[]
    expects: Expect22[]
    depends: string[]
    url: string
    short_description: string
}

export interface Expect22 {
    type: string
    strict_range?: StrictRange5
    "0"?: N0[]
    "1"?: N1[]
    "2"?: N2[]
    "3"?: N3[]
    length?: number
}

export interface StrictRange5 {
    min: number
}

export interface N0 {
    type: string
    strict_range: StrictRange6
}

export interface StrictRange6 {
    min: number
}

export interface N1 {
    type: string
    strict_range: StrictRange7
}

export interface StrictRange7 {
    min: number
}

export interface N2 {
    type: string
    strict_range: StrictRange8
}

export interface StrictRange8 {
    min: number
}

export interface N3 {
    type: string
    strict_range: StrictRange9
}

export interface StrictRange9 {
    min: number
}

export interface BorderRadius {
    display_name: string
    category: string
    available_in: string[]
    expects: Expect23[]
    depends: string[]
    url: string
    short_description: string
}

export interface Expect23 {
    type: string
    strict_range?: StrictRange10
    "0"?: N02[]
    "1"?: N12[]
    "2"?: N22[]
    "3"?: N32[]
    length?: number
}

export interface StrictRange10 {
    min: number
}

export interface N02 {
    type: string
    strict_range: StrictRange11
}

export interface StrictRange11 {
    min: number
}

export interface N12 {
    type: string
    strict_range: StrictRange12
}

export interface StrictRange12 {
    min: number
}

export interface N22 {
    type: string
    strict_range: StrictRange13
}

export interface StrictRange13 {
    min: number
}

export interface N32 {
    type: string
    strict_range: StrictRange14
}

export interface StrictRange14 {
    min: number
}

export interface BorderRight {
    display_name: string
    category: string
    available_in: string[]
    expects: Expect24[]
    depends: string[]
    url: string
    short_description: string
}

export interface Expect24 {
    type: string
    suggested_range: SuggestedRange7
}

export interface SuggestedRange7 {
    min: number
    max: number
}

export interface BorderTop {
    display_name: string
    category: string
    available_in: string[]
    expects: Expect25[]
    depends: string[]
    url: string
    short_description: string
}

export interface Expect25 {
    type: string
    suggested_range: SuggestedRange8
}

export interface SuggestedRange8 {
    min: number
    max: number
}

export interface Border {
    display_name: string
    category: string
    available_in: string[]
    expects: Expect26[]
    url: string
    short_description: string
}

export interface Expect26 {
    "0": N03[]
    "1": N13[]
    type: string
    length: number
}

export interface N03 {
    type: string
    suggested_range: SuggestedRange9
}

export interface SuggestedRange9 {
    min: number
    max: number
}

export interface N13 {
    type: string
}

export interface Bri {
    display_name: string
    category: string
    available_in: string[]
    expects: Expect27[]
    default: number
    url: string
    short_description: string
}

export interface Expect27 {
    type: string
    suggested_range: SuggestedRange10
}

export interface SuggestedRange10 {
    min: number
    max: number
}

export interface Ch {
    display_name: string
    category: string
    available_in: string[]
    expects: Expect28[]
    disallow_base64: boolean
    url: string
    short_description: string
}

export interface Expect28 {
    type: string
    possible_values: string[]
}

export interface Chromasub {
    display_name: string
    category: string
    available_in: string[]
    expects: Expect29[]
    default: number
    url: string
    short_description: string
}

export interface Expect29 {
    type: string
    possible_values: number[]
}

export interface Colorquant {
    display_name: string
    category: string
    available_in: string[]
    expects: Expect30[]
    url: string
    short_description: string
}

export interface Expect30 {
    type: string
    suggested_range: SuggestedRange11
}

export interface SuggestedRange11 {
    min: number
    max: number
}

export interface Colors {
    display_name: string
    category: string
    available_in: string[]
    expects: Expect31[]
    default: number
    depends: string[]
    url: string
    short_description: string
}

export interface Expect31 {
    type: string
    suggested_range: SuggestedRange12
}

export interface SuggestedRange12 {
    min: number
    max: number
}

export interface Con {
    display_name: string
    category: string
    available_in: string[]
    expects: Expect32[]
    default: number
    url: string
    short_description: string
}

export interface Expect32 {
    type: string
    suggested_range: SuggestedRange13
}

export interface SuggestedRange13 {
    min: number
    max: number
}

export interface CornerRadius {
    display_name: string
    category: string
    available_in: string[]
    expects: Expect33[]
    depends: string[]
    url: string
    short_description: string
}

export interface Expect33 {
    type: string
    strict_range?: StrictRange15
    "0"?: N04[]
    "1"?: N14[]
    "2"?: N23[]
    "3"?: N33[]
    length?: number
}

export interface StrictRange15 {
    min: number
}

export interface N04 {
    type: string
    strict_range: StrictRange16
}

export interface StrictRange16 {
    min: number
}

export interface N14 {
    type: string
    strict_range: StrictRange17
}

export interface StrictRange17 {
    min: number
}

export interface N23 {
    type: string
    strict_range: StrictRange18
}

export interface StrictRange18 {
    min: number
}

export interface N33 {
    type: string
    strict_range: StrictRange19
}

export interface StrictRange19 {
    min: number
}

export interface Crop {
    display_name: string
    category: string
    available_in: string[]
    expects: Expect34[]
    depends: string[]
    url: string
    short_description: string
}

export interface Expect34 {
    type: string
    possible_values: string[]
}

export interface Cs {
    display_name: string
    category: string
    available_in: string[]
    expects: Expect35[]
    url: string
    short_description: string
}

export interface Expect35 {
    type: string
    possible_values: string[]
}

export interface Dl {
    display_name: string
    category: string
    available_in: string[]
    expects: Expect36[]
    url: string
    short_description: string
}

export interface Expect36 {
    type: string
}

export interface Dpi {
    display_name: string
    category: string
    available_in: string[]
    expects: Expect37[]
    url: string
    short_description: string
}

export interface Expect37 {
    type: string
    suggested_range: SuggestedRange14
}

export interface SuggestedRange14 {
    min: number
}

export interface Dpr {
    display_name: string
    category: string
    available_in: string[]
    expects: Expect38[]
    default: number
    url: string
    short_description: string
}

export interface Expect38 {
    type: string
    suggested_range: SuggestedRange15
    strict_range: StrictRange20
}

export interface SuggestedRange15 {
    min: number
    max: number
}

export interface StrictRange20 {
    min: number
    max: number
}

export interface DuotoneAlpha {
    display_name: string
    category: string
    available_in: string[]
    expects: Expect39[]
    default: number
    depends: string[]
    url: string
    short_description: string
}

export interface Expect39 {
    type: string
    strict_range: StrictRange21
}

export interface StrictRange21 {
    min: number
    max: number
}

export interface Duotone {
    display_name: string
    category: string
    available_in: string[]
    expects: Expect40[]
    url: string
    short_description: string
}

export interface Expect40 {
    "0": N05[]
    "1": N15[]
    type: string
    length: number
}

export interface N05 {
    type: string
}

export interface N15 {
    type: string
}

export interface Exp {
    display_name: string
    category: string
    available_in: string[]
    expects: Expect41[]
    default: number
    url: string
    short_description: string
}

export interface Expect41 {
    type: string
    suggested_range: SuggestedRange16
}

export interface SuggestedRange16 {
    min: number
    max: number
}

export interface Expires {
    display_name: string
    category: string
    available_in: string[]
    expects: Expect42[]
    url: string
    short_description: string
}

export interface Expect42 {
    type: string
}

export interface Faceindex {
    display_name: string
    category: string
    available_in: string[]
    expects: Expect43[]
    depends: string[]
    url: string
    short_description: string
}

export interface Expect43 {
    type: string
    suggested_range: SuggestedRange17
}

export interface SuggestedRange17 {
    min: number
}

export interface Facepad {
    display_name: string
    category: string
    available_in: string[]
    expects: Expect44[]
    default: number
    depends: string[]
    url: string
    short_description: string
}

export interface Expect44 {
    type: string
    suggested_range: SuggestedRange18
}

export interface SuggestedRange18 {
    min: number
    max: number
}

export interface Faces {
    display_name: string
    category: string
    available_in: string[]
    expects: Expect45[]
    depends: string[]
    url: string
    short_description: string
}

export interface Expect45 {
    type: string
    possible_values: number[]
}

export interface FillColor {
    display_name: string
    category: string
    available_in: string[]
    expects: Expect46[]
    aliases: string[]
    default: string
    depends: string[]
    url: string
    short_description: string
}

export interface Expect46 {
    type: string
}

export interface Fill {
    display_name: string
    category: string
    available_in: string[]
    expects: Expect47[]
    depends: string[]
    url: string
    short_description: string
}

export interface Expect47 {
    type: string
    possible_values: string[]
}

export interface Fit {
    display_name: string
    category: string
    available_in: string[]
    expects: Expect48[]
    default: string
    aliases: string[]
    url: string
    short_description: string
}

export interface Expect48 {
    type: string
    possible_values: string[]
}

export interface Flip {
    display_name: string
    category: string
    available_in: string[]
    expects: Expect49[]
    url: string
    short_description: string
}

export interface Expect49 {
    type: string
    possible_values: string[]
}

export interface Fm {
    display_name: string
    category: string
    available_in: string[]
    expects: Expect50[]
    url: string
    short_description: string
}

export interface Expect50 {
    type: string
    possible_values: string[]
}

export interface FpDebug {
    display_name: string
    category: string
    available_in: string[]
    expects: Expect51[]
    default: boolean
    depends: string[]
    url: string
    short_description: string
}

export interface Expect51 {
    type: string
}

export interface FpX {
    display_name: string
    category: string
    available_in: string[]
    expects: Expect52[]
    depends: string[]
    url: string
    short_description: string
}

export interface Expect52 {
    type: string
    default: number
    strict_range: StrictRange22
}

export interface StrictRange22 {
    min: number
    max: number
}

export interface FpY {
    display_name: string
    category: string
    available_in: string[]
    expects: Expect53[]
    depends: string[]
    url: string
    short_description: string
}

export interface Expect53 {
    type: string
    default: number
    strict_range: StrictRange23
}

export interface StrictRange23 {
    min: number
    max: number
}

export interface FpZ {
    display_name: string
    category: string
    available_in: string[]
    expects: Expect54[]
    depends: string[]
    url: string
    short_description: string
}

export interface Expect54 {
    type: string
    default: number
    suggested_range: SuggestedRange19
    strict_range: StrictRange24
}

export interface SuggestedRange19 {
    min: number
    max: number
}

export interface StrictRange24 {
    min: number
    max: number
}

export interface Fps {
    display_name: string
    category: string
    available_in: string[]
    expects: Expect55[]
    short_description: string
}

export interface Expect55 {
    type: string
    suggested_range: SuggestedRange20
}

export interface SuggestedRange20 {
    min: number
    max: number
}

export interface Frame {
    display_name: string
    category: string
    available_in: string[]
    expects: Expect56[]
    short_description: string
}

export interface Expect56 {
    type: string
    suggested_range?: SuggestedRange21
    lower_bound?: LowerBound
    upper_bound?: UpperBound
}

export interface SuggestedRange21 {
    min: number
}

export interface LowerBound {
    type: string
    suggested_range: SuggestedRange22
    required: boolean
}

export interface SuggestedRange22 {
    min: number
}

export interface UpperBound {
    type: string
    suggested_range: SuggestedRange23
    required: boolean
}

export interface SuggestedRange23 {
    min: number
}

export interface Gam {
    display_name: string
    category: string
    available_in: string[]
    expects: Expect57[]
    default: number
    url: string
    short_description: string
}

export interface Expect57 {
    type: string
    suggested_range: SuggestedRange24
}

export interface SuggestedRange24 {
    min: number
    max: number
}

export interface GifQ {
    display_name: string
    category: string
    available_in: string[]
    expects: Expect58[]
    depends: string[]
    aliases: string[]
}

export interface Expect58 {
    type: string
    strict_range: StrictRange25
}

export interface StrictRange25 {
    min: number
}

export interface GridColors {
    display_name: string
    category: string
    available_in: string[]
    expects: Expect59[]
    depends: string[]
    short_description: string
}

export interface Expect59 {
    "0": N06[]
    "1": N16[]
    type: string
    default: string
    length: number
}

export interface N06 {
    type: string
}

export interface N16 {
    type: string
}

export interface GridSize {
    display_name: string
    category: string
    available_in: string[]
    expects: Expect60[]
    depends: string[]
    short_description: string
}

export interface Expect60 {
    type: string
    default: number
    strict_range: StrictRange26
}

export interface StrictRange26 {
    min: number
}

export interface H {
    display_name: string
    category: string
    available_in: string[]
    expects: Expect61[]
    aliases: string[]
    url: string
    short_description: string
}

export interface Expect61 {
    type: string
    strict_range: StrictRange27
}

export interface StrictRange27 {
    min: number
    max: number
}

export interface High {
    display_name: string
    category: string
    available_in: string[]
    expects: Expect62[]
    default: number
    url: string
    short_description: string
}

export interface Expect62 {
    type: string
    suggested_range: SuggestedRange25
}

export interface SuggestedRange25 {
    min: number
    max: number
}

export interface Htn {
    display_name: string
    category: string
    available_in: string[]
    expects: Expect63[]
    default: number
    url: string
    short_description: string
}

export interface Expect63 {
    type: string
    suggested_range: SuggestedRange26
}

export interface SuggestedRange26 {
    min: number
    max: number
}

export interface Hue {
    display_name: string
    category: string
    available_in: string[]
    expects: Expect64[]
    default: number
    url: string
    short_description: string
}

export interface Expect64 {
    type: string
    suggested_range: SuggestedRange27
}

export interface SuggestedRange27 {
    min: number
    max: number
}

export interface Interval {
    display_name: string
    category: string
    available_in: string[]
    expects: Expect65[]
    short_description: string
}

export interface Expect65 {
    type: string
    strict_range: StrictRange28
}

export interface StrictRange28 {
    min: number
}

export interface Invert {
    display_name: string
    category: string
    available_in: string[]
    expects: Expect66[]
    aliases: string[]
    default: boolean
    url: string
    short_description: string
}

export interface Expect66 {
    type: string
}

export interface Iptc {
    display_name: string
    category: string
    available_in: string[]
    expects: Expect67[]
    short_description: string
}

export interface Expect67 {
    type: string
    possible_values: string[]
}

export interface Loop {
    display_name: string
    category: string
    available_in: string[]
    expects: Expect68[]
    default: number
    short_description: string
}

export interface Expect68 {
    type: string
    suggested_range: SuggestedRange28
}

export interface SuggestedRange28 {
    min: number
}

export interface Lossless {
    display_name: string
    category: string
    available_in: string[]
    expects: Expect69[]
    default: boolean
    depends: string[]
    url: string
    short_description: string
}

export interface Expect69 {
    type: string
}

export interface MarkAlign {
    display_name: string
    category: string
    available_in: string[]
    expects: Expect70[]
    aliases: string[]
    depends: string[]
    url: string
    short_description: string
}

export interface Expect70 {
    type: string
    possible_values: string[]
}

export interface MarkAlpha {
    display_name: string
    category: string
    available_in: string[]
    expects: Expect71[]
    default: number
    aliases: string[]
    depends: string[]
    url: string
    short_description: string
}

export interface Expect71 {
    type: string
    suggested_range: SuggestedRange29
}

export interface SuggestedRange29 {
    min: number
    max: number
}

export interface MarkBase {
    display_name: string
    category: string
    available_in: string[]
    expects: Expect72[]
    aliases: string[]
    depends: string[]
    url: string
    short_description: string
}

export interface Expect72 {
    type: string
}

export interface MarkFit {
    display_name: string
    category: string
    available_in: string[]
    expects: Expect73[]
    default: string
    aliases: string[]
    depends: string[]
    url: string
    short_description: string
}

export interface Expect73 {
    type: string
    possible_values: string[]
}

export interface MarkH {
    display_name: string
    category: string
    available_in: string[]
    expects: Expect74[]
    aliases: string[]
    depends: string[]
    url: string
    short_description: string
}

export interface Expect74 {
    type: string
    strict_range: StrictRange29
}

export interface StrictRange29 {
    min: number
    max: number
}

export interface MarkPad {
    display_name: string
    category: string
    available_in: string[]
    expects: Expect75[]
    default: number
    aliases: string[]
    depends: string[]
    url: string
    short_description: string
}

export interface Expect75 {
    type: string
    suggested_range: SuggestedRange30
}

export interface SuggestedRange30 {
    min: number
}

export interface MarkRot {
    display_name: string
    category: string
    available_in: string[]
    expects: Expect76[]
    default: number
    url: string
    short_description: string
}

export interface Expect76 {
    type: string
    suggested_range: SuggestedRange31
}

export interface SuggestedRange31 {
    min: number
    max: number
}

export interface MarkScale {
    display_name: string
    category: string
    available_in: string[]
    expects: Expect77[]
    aliases: string[]
    depends: string[]
    url: string
    short_description: string
}

export interface Expect77 {
    type: string
    suggested_range: SuggestedRange32
}

export interface SuggestedRange32 {
    min: number
    max: number
}

export interface MarkTile {
    display_name: string
    category: string
    available_in: string[]
    expects: Expect78[]
    aliases: string[]
    depends: string[]
    url: string
    short_description: string
}

export interface Expect78 {
    type: string
    possible_values: string[]
}

export interface MarkW {
    display_name: string
    category: string
    available_in: string[]
    expects: Expect79[]
    aliases: string[]
    depends: string[]
    url: string
    short_description: string
}

export interface Expect79 {
    type: string
    strict_range: StrictRange30
}

export interface StrictRange30 {
    min: number
    max: number
}

export interface MarkX {
    display_name: string
    category: string
    available_in: string[]
    expects: Expect80[]
    aliases: string[]
    depends: string[]
    url: string
    short_description: string
}

export interface Expect80 {
    type: string
    suggested_range: SuggestedRange33
}

export interface SuggestedRange33 {
    min: number
}

export interface MarkY {
    display_name: string
    category: string
    available_in: string[]
    expects: Expect81[]
    aliases: string[]
    depends: string[]
    url: string
    short_description: string
}

export interface Expect81 {
    type: string
    strict_range: StrictRange31
}

export interface StrictRange31 {
    min: number
}

export interface Mark {
    display_name: string
    category: string
    available_in: string[]
    expects: Expect82[]
    aliases: string[]
    url: string
    short_description: string
}

export interface Expect82 {
    type: string
}

export interface MaskBg {
    display_name: string
    category: string
    available_in: string[]
    expects: Expect83[]
    default: string
    aliases: string[]
    depends: string[]
    url: string
    short_description: string
}

export interface Expect83 {
    type: string
}

export interface Mask {
    display_name: string
    category: string
    available_in: string[]
    expects: Expect84[]
    url: string
    short_description: string
}

export interface Expect84 {
    type: string
    possible_values?: string[]
}

export interface MaxH {
    display_name: string
    category: string
    available_in: string[]
    expects: Expect85[]
    aliases: string[]
    depends: string[]
    url: string
    short_description: string
}

export interface Expect85 {
    type: string
    strict_range: StrictRange32
}

export interface StrictRange32 {
    min: number
    max: number
}

export interface MaxW {
    display_name: string
    category: string
    available_in: string[]
    expects: Expect86[]
    aliases: string[]
    depends: string[]
    url: string
    short_description: string
}

export interface Expect86 {
    type: string
    strict_range: StrictRange33
}

export interface StrictRange33 {
    min: number
    max: number
}

export interface MinH {
    display_name: string
    category: string
    available_in: string[]
    expects: Expect87[]
    aliases: string[]
    depends: string[]
    url: string
    short_description: string
}

export interface Expect87 {
    type: string
    strict_range: StrictRange34
}

export interface StrictRange34 {
    min: number
    max: number
}

export interface MinW {
    display_name: string
    category: string
    available_in: string[]
    expects: Expect88[]
    aliases: string[]
    depends: string[]
    url: string
    short_description: string
}

export interface Expect88 {
    type: string
    strict_range: StrictRange35
}

export interface StrictRange35 {
    min: number
    max: number
}

export interface Monochrome {
    display_name: string
    category: string
    available_in: string[]
    expects: Expect89[]
    aliases: string[]
    url: string
    short_description: string
}

export interface Expect89 {
    type: string
}

export interface Nr {
    display_name: string
    category: string
    available_in: string[]
    expects: Expect90[]
    default: number
    url: string
    short_description: string
}

export interface Expect90 {
    type: string
    suggested_range: SuggestedRange34
}

export interface SuggestedRange34 {
    min: number
    max: number
}

export interface Nrs {
    display_name: string
    category: string
    available_in: string[]
    expects: Expect91[]
    default: number
    url: string
    short_description: string
}

export interface Expect91 {
    type: string
    suggested_range: SuggestedRange35
}

export interface SuggestedRange35 {
    min: number
    max: number
}

export interface Orient {
    display_name: string
    category: string
    available_in: string[]
    expects: Expect92[]
    aliases: string[]
    url: string
    short_description: string
}

export interface Expect92 {
    type: string
    possible_values: number[]
}

export interface PadBottom {
    display_name: string
    category: string
    available_in: string[]
    expects: Expect93[]
    url: string
    short_description: string
}

export interface Expect93 {
    type: string
    suggested_range: SuggestedRange36
    default: number
}

export interface SuggestedRange36 {
    min: number
}

export interface PadLeft {
    display_name: string
    category: string
    available_in: string[]
    expects: Expect94[]
    url: string
    short_description: string
}

export interface Expect94 {
    type: string
    suggested_range: SuggestedRange37
    default: number
}

export interface SuggestedRange37 {
    min: number
}

export interface PadRight {
    display_name: string
    category: string
    available_in: string[]
    expects: Expect95[]
    url: string
    short_description: string
}

export interface Expect95 {
    type: string
    suggested_range: SuggestedRange38
    default: number
}

export interface SuggestedRange38 {
    min: number
}

export interface PadTop {
    display_name: string
    category: string
    available_in: string[]
    expects: Expect96[]
    url: string
    short_description: string
}

export interface Expect96 {
    type: string
    suggested_range: SuggestedRange39
    default: number
}

export interface SuggestedRange39 {
    min: number
}

export interface Pad {
    display_name: string
    category: string
    available_in: string[]
    expects: Expect97[]
    default: number
    url: string
    short_description: string
}

export interface Expect97 {
    type: string
    suggested_range: SuggestedRange40
}

export interface SuggestedRange40 {
    min: number
}

export interface Page {
    display_name: string
    category: string
    available_in: string[]
    expects: Expect98[]
    default: number
    url: string
    short_description: string
}

export interface Expect98 {
    type: string
    suggested_range: SuggestedRange41
}

export interface SuggestedRange41 {
    min: number
}

export interface Palette {
    display_name: string
    category: string
    available_in: string[]
    expects: Expect99[]
    url: string
    short_description: string
}

export interface Expect99 {
    type: string
    possible_values: string[]
}

export interface PdfAnnotation {
    display_name: string
    category: string
    available_in: string[]
    expects: Expect100[]
    default: boolean
    aliases: string[]
    url: string
    short_description: string
}

export interface Expect100 {
    type: string
}

export interface Prefix {
    display_name: string
    category: string
    available_in: string[]
    expects: Expect101[]
    default: string
    depends: string[]
    url: string
    short_description: string
}

export interface Expect101 {
    type: string
}

export interface Px {
    display_name: string
    category: string
    available_in: string[]
    expects: Expect102[]
    default: number
    url: string
    short_description: string
}

export interface Expect102 {
    type: string
    suggested_range: SuggestedRange42
}

export interface SuggestedRange42 {
    min: number
    max: number
}

export interface Q {
    display_name: string
    category: string
    available_in: string[]
    expects: Expect103[]
    default: number
    depends: string[]
    url: string
    short_description: string
}

export interface Expect103 {
    type: string
    suggested_range: SuggestedRange43
}

export interface SuggestedRange43 {
    min: number
    max: number
}

export interface Rect {
    display_name: string
    category: string
    available_in: string[]
    expects: Expect104[]
    url: string
    short_description: string
}

export interface Expect104 {
    "0": N07[]
    "1": N17[]
    "2": N24[]
    "3": N34[]
    type: string
    length: number
}

export interface N07 {
    type: string
    strict_range?: StrictRange36
    possible_values?: string[]
}

export interface StrictRange36 {
    min: number
    max?: number
}

export interface N17 {
    type: string
    strict_range?: StrictRange37
    possible_values?: string[]
}

export interface StrictRange37 {
    min: number
    max?: number
}

export interface N24 {
    type: string
    strict_range: StrictRange38
}

export interface StrictRange38 {
    min: number
}

export interface N34 {
    type: string
    strict_range: StrictRange39
}

export interface StrictRange39 {
    min: number
}

export interface Reverse {
    display_name: string
    category: string
    available_in: string[]
    expects: Expect105[]
    default: boolean
    short_description: string
}

export interface Expect105 {
    type: string
}

export interface Rot {
    display_name: string
    category: string
    available_in: string[]
    expects: Expect106[]
    default: number
    url: string
    short_description: string
}

export interface Expect106 {
    type: string
    suggested_range: SuggestedRange44
}

export interface SuggestedRange44 {
    min: number
    max: number
}

export interface Sat {
    display_name: string
    category: string
    available_in: string[]
    expects: Expect107[]
    default: number
    url: string
    short_description: string
}

export interface Expect107 {
    type: string
    suggested_range: SuggestedRange45
}

export interface SuggestedRange45 {
    min: number
    max: number
}

export interface Sepia {
    display_name: string
    category: string
    available_in: string[]
    expects: Expect108[]
    default: number
    url: string
    short_description: string
}

export interface Expect108 {
    type: string
    suggested_range: SuggestedRange46
}

export interface SuggestedRange46 {
    min: number
    max: number
}

export interface Shad {
    display_name: string
    category: string
    available_in: string[]
    expects: Expect109[]
    default: number
    url: string
    short_description: string
}

export interface Expect109 {
    type: string
    suggested_range: SuggestedRange47
}

export interface SuggestedRange47 {
    min: number
    max: number
}

export interface Sharp {
    display_name: string
    category: string
    available_in: string[]
    expects: Expect110[]
    default: number
    url: string
    short_description: string
}

export interface Expect110 {
    type: string
    suggested_range: SuggestedRange48
}

export interface SuggestedRange48 {
    min: number
    max: number
}

export interface Skip {
    display_name: string
    category: string
    available_in: string[]
    expects: Expect111[]
    short_description: string
}

export interface Expect111 {
    type: string
    strict_range: StrictRange40
}

export interface StrictRange40 {
    min: number
}

export interface Transparency {
    display_name: string
    category: string
    available_in: string[]
    expects: Expect112[]
    url: string
    short_description: string
}

export interface Expect112 {
    type: string
    possible_values: string[]
}

export interface TrimColor {
    display_name: string
    category: string
    available_in: string[]
    expects: Expect113[]
    aliases: string[]
    depends: string[]
    url: string
    short_description: string
}

export interface Expect113 {
    type: string
}

export interface TrimMd {
    display_name: string
    category: string
    available_in: string[]
    expects: Expect114[]
    aliases: string[]
    default: number
    depends: string[]
    url: string
    short_description: string
}

export interface Expect114 {
    type: string
    suggested_range: SuggestedRange49
}

export interface SuggestedRange49 {
    min: number
}

export interface TrimPad {
    display_name: string
    category: string
    available_in: string[]
    expects: Expect115[]
    default: number
    aliases: string[]
    depends: string[]
    url: string
    short_description: string
}

export interface Expect115 {
    type: string
    suggested_range: SuggestedRange50
}

export interface SuggestedRange50 {
    min: number
}

export interface TrimSd {
    display_name: string
    category: string
    available_in: string[]
    expects: Expect116[]
    aliases: string[]
    default: number
    depends: string[]
    url: string
    short_description: string
}

export interface Expect116 {
    type: string
    suggested_range: SuggestedRange51
}

export interface SuggestedRange51 {
    min: number
}

export interface TrimTol {
    display_name: string
    category: string
    available_in: string[]
    expects: Expect117[]
    aliases: string[]
    default: number
    depends: string[]
    url: string
    short_description: string
}

export interface Expect117 {
    type: string
    suggested_range: SuggestedRange52
}

export interface SuggestedRange52 {
    min: number
}

export interface Trim {
    display_name: string
    category: string
    available_in: string[]
    expects: Expect118[]
    url: string
    short_description: string
}

export interface Expect118 {
    type: string
    possible_values: string[]
}

export interface TxtAlign {
    display_name: string
    category: string
    available_in: string[]
    expects: Expect119[]
    aliases: string[]
    depends: string[]
    url: string
    short_description: string
}

export interface Expect119 {
    type: string
    possible_values: string[]
}

export interface TxtClip {
    display_name: string
    category: string
    available_in: string[]
    expects: Expect120[]
    default: string
    aliases: string[]
    depends: string[]
    url: string
    short_description: string
}

export interface Expect120 {
    type: string
    possible_values: string[]
}

export interface TxtColor {
    display_name: string
    category: string
    available_in: string[]
    expects: Expect121[]
    aliases: string[]
    depends: string[]
    url: string
    short_description: string
}

export interface Expect121 {
    type: string
}

export interface TxtFit {
    display_name: string
    category: string
    available_in: string[]
    expects: Expect122[]
    aliases: string[]
    depends: string[]
    url: string
    short_description: string
}

export interface Expect122 {
    type: string
    possible_values: string[]
}

export interface TxtFont {
    display_name: string
    category: string
    available_in: string[]
    expects: Expect123[]
    aliases: string[]
    depends: string[]
    url: string
    short_description: string
}

export interface Expect123 {
    type: string
}

export interface TxtLead {
    display_name: string
    category: string
    available_in: string[]
    expects: Expect124[]
    aliases: string[]
    default: number
    depends: string[]
    url: string
    short_description: string
}

export interface Expect124 {
    type: string
    suggested_range: SuggestedRange53
}

export interface SuggestedRange53 {
    min: number
}

export interface TxtLig {
    display_name: string
    category: string
    available_in: string[]
    expects: Expect125[]
    aliases: string[]
    depends: string[]
    url: string
    short_description: string
}

export interface Expect125 {
    type: string
    possible_values: number[]
}

export interface TxtLineColor {
    display_name: string
    category: string
    available_in: string[]
    expects: Expect126[]
    default: string
    aliases: string[]
    depends: string[]
    url: string
    short_description: string
}

export interface Expect126 {
    type: string
}

export interface TxtLine {
    display_name: string
    category: string
    available_in: string[]
    expects: Expect127[]
    default: number
    aliases: string[]
    depends: string[]
    url: string
    short_description: string
}

export interface Expect127 {
    type: string
    suggested_range: SuggestedRange54
}

export interface SuggestedRange54 {
    min: number
}

export interface TxtPad {
    display_name: string
    category: string
    available_in: string[]
    expects: Expect128[]
    aliases: string[]
    depends: string[]
    url: string
    short_description: string
}

export interface Expect128 {
    type: string
    default: number
    suggested_range: SuggestedRange55
}

export interface SuggestedRange55 {
    min: number
}

export interface TxtShad {
    display_name: string
    category: string
    available_in: string[]
    expects: Expect129[]
    default: number
    aliases: string[]
    depends: string[]
    url: string
    short_description: string
}

export interface Expect129 {
    type: string
    suggested_range: SuggestedRange56
}

export interface SuggestedRange56 {
    min: number
    max: number
}

export interface TxtSize {
    display_name: string
    category: string
    available_in: string[]
    expects: Expect130[]
    default: number
    aliases: string[]
    depends: string[]
    url: string
    short_description: string
}

export interface Expect130 {
    type: string
    suggested_range: SuggestedRange57
}

export interface SuggestedRange57 {
    min: number
}

export interface TxtTrack {
    display_name: string
    category: string
    available_in: string[]
    expects: Expect131[]
    default: number
    aliases: string[]
    depends: string[]
    url: string
    short_description: string
}

export interface Expect131 {
    type: string
    suggested_range: SuggestedRange58
}

export interface SuggestedRange58 {
    min: number
}

export interface TxtWidth {
    display_name: string
    category: string
    available_in: string[]
    expects: Expect132[]
    aliases: string[]
    depends: string[]
    url: string
    short_description: string
}

export interface Expect132 {
    type: string
    suggested_range: SuggestedRange59
}

export interface SuggestedRange59 {
    min: number
}

export interface TxtX {
    display_name: string
    category: string
    available_in: string[]
    expects: Expect133[]
    aliases: string[]
    default: number
    depends: string[]
    url: string
    short_description: string
}

export interface Expect133 {
    type: string
}

export interface TxtY {
    display_name: string
    category: string
    available_in: string[]
    expects: Expect134[]
    aliases: string[]
    default: number
    depends: string[]
    url: string
    short_description: string
}

export interface Expect134 {
    type: string
}

export interface Txt {
    display_name: string
    category: string
    available_in: string[]
    expects: Expect135[]
    aliases: string[]
    url: string
    short_description: string
}

export interface Expect135 {
    type: string
}

export interface UpscaleFallback {
    display_name: string
    category: string
    available_in: string[]
    expects: Expect136[]
    default: boolean
    url: string
    short_description: string
}

export interface Expect136 {
    type: string
}

export interface Upscale {
    display_name: string
    category: string
    available_in: string[]
    expects: Expect137[]
    default: boolean
    url: string
    short_description: string
}

export interface Expect137 {
    type: string
}

export interface Usm {
    display_name: string
    category: string
    available_in: string[]
    expects: Expect138[]
    default: number
    url: string
    short_description: string
}

export interface Expect138 {
    type: string
    suggested_range: SuggestedRange60
}

export interface SuggestedRange60 {
    min: number
    max: number
}

export interface Usmrad {
    display_name: string
    category: string
    available_in: string[]
    expects: Expect139[]
    default: number
    depends: string[]
    url: string
    short_description: string
}

export interface Expect139 {
    type: string
    suggested_range: SuggestedRange61
}

export interface SuggestedRange61 {
    min: number
}

export interface Vib {
    display_name: string
    category: string
    available_in: string[]
    expects: Expect140[]
    default: number
    url: string
    short_description: string
}

export interface Expect140 {
    type: string
    suggested_range: SuggestedRange62
}

export interface SuggestedRange62 {
    min: number
    max: number
}

export interface W {
    display_name: string
    category: string
    available_in: string[]
    expects: Expect141[]
    aliases: string[]
    url: string
    short_description: string
}

export interface Expect141 {
    type: string
    strict_range: StrictRange41
}

export interface StrictRange41 {
    min: number
    max: number
}
