// import original module declarations
import "styled-components";

// and extend them!
declare module "styled-components" {
    export interface DefaultTheme {
        red: string;
        balck: {
            variDark: string;
            darker: string;
            lighter: string;
        };
        white: {
            lighter: string;
            darker: string;
        };
    }
}
