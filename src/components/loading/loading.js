import Style from './loading.module.css'

function Loading() {
    return(
        <div className={Style.container}>
            <span className={Style.loader}></span>
        </div>
    )
}

export default Loading