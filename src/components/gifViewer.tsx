import { CSSProperties, FC } from 'react'

type GifViewerProps = {
  imagePath: string
  style?: CSSProperties
}

const GifViewer: FC<GifViewerProps> = ({ imagePath, style }) => {
  const defaultStyle: CSSProperties = {
    width: '100%',
    height: '100%',
    objectFit: 'contain',
  }

  const combinedStyle = { ...defaultStyle, ...style }

  return (
    <div className={'absolute top-0 left-0 w-screen h-[100svh] -z-10'}>
      <img src={imagePath} alt="AI Character" style={combinedStyle} />
    </div>
  )
}

export default GifViewer
