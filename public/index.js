const startBtn                 =     document.querySelector('.start-btn')
const videoURLInput            =     document.querySelector('.video-url-input')
const videoThumbnailImg        =     document.querySelector('.video-thumbnail')
const videoTitleDiv            =     document.querySelector('.video-title')
const resolutionsDiv           =     document.querySelector('.resolutions')
const downloadBtn              =     document.querySelector('.download-btn')
const videoResolutionsSection  =     document.querySelector('.video-resolution-section')
const videoInfoSection         =     document.querySelector('.video-info-section')
const videoForamtsSection      =     document.querySelector('.video-formats-section')


const getVideoID = () => {
    const url = videoURLInput.value
    const searchParams = new URLSearchParams(url.split('?')[1])
    return searchParams.get('v')
}

const getVideoInfo = async (id) => {
    const res= await fetch(`/api/video?id=${id}`)
    return res.json()
}

const show= el => el.classList.remove('d-none')

const showResolutions = resolutions => {
 const html = resolutions
    .map((resolution, i) => `
                        <label class="custom-radio">
                            <input type="radio" name="resolution" value="${resolution}" ${i === 0 ? 'checked' : ''}>
                            <div class="custom-radio-btn">${resolution}</div>
                        </label>
                     `)
                    .join('')

                resolutionsDiv.innerHTML = html
}


const getRadioValue = name =>
    document.querySelector(`[name="${name}"]:checked`).value

const getDownloadAnchor = ({id, resolution, format}) =>{
    let url =`/download?id=${id}&format=${format}`

    if(format === 'video'){
        url += `&resolution=${resolution}`
    }

    const a = document.createElement('a')
    a.href = url
    a.download = true
    return a
}
const download = ({id, resolution, format})=>{
    const a = getDownloadAnchor({id, resolution, format})
    a.click()
}

startBtn.addEventListener(
    'click',
    async() => {
        const id= getVideoID()
        const {title, resolutions, thumbnailURL}= await getVideoInfo(id)
    
            show(videoForamtsSection)
            show(videoResolutionsSection)
            show(videoInfoSection)

        videoTitleDiv.textContent=title
        videoThumbnailImg.src=thumbnailURL        
        showResolutions(resolutions)
    }
)

downloadBtn.addEventListener(
    'click',
     () => {
        download({
            id: getVideoID(),
            resolution: getRadioValue('resolution'),
            format: getRadioValue('format')
        })
    }
)