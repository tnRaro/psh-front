interface ILogo {
    to?: string;
}

const Logo = (props: ILogo) => {
    return <a href={props.to || "/"}> PSH Logo</a>;
}

export default Logo;