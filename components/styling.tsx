import { IsMobile } from "../utils";

export let Variables = {
    header_mobile_height: '75px'
}

export let Fonts = {
    Oswald: "'Oswald', sans-serif",
    Roboto: "'Roboto', sans-serif",
    ReservationWide: "'ReservationWide', sans-serif"
}

export let Media = {
    mobile: "screen and (max-width: 991px)",
    mobile_xxs: "screen and (max-width: 576px)",
    mobile_xs: "screen and (max-width: 767px)",
    desktop: "screen and (min-width: 1201px)",
    tablet: "screen and (min-width: 991px)",
    tablet_only: "screen and (min-width: 992px) and (max-width: 1200px)",
    desktop_xl: "screen and (min-width: 1200px)",
    desktop_xl_inverse: "screen and (max-width: 1200px)",
}

export let Colors = {
    woodsmoke: '#111212',
    white: '#FFFFFF'
}

export let rem = (...args: string[]) => {
    let output: any = [];
    let base = 16;
    let power = process.browser && IsMobile() ? 0.9 : 1;
    
    args.map((_, idx) => {
        let innerOutput: any = [];
        let innerArgs = args[idx].split(" ");
        innerArgs.map((_, innerIdx) => {
            innerOutput.push((power/base * parseInt(innerArgs[innerIdx].split('px')[0]) ) + 'rem');
        })
        output.push(innerOutput.join(" "));
    });

    return output.join(', ');
}