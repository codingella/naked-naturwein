'use client'
import React, { useState, useRef, useEffect, useMemo, useContext } from 'react';
import style from './Home.module.css';
import Content, {ContentWithInline} from './elements/blockContent/Content';
import Media from './elements/Media';
import { getRatio } from '@helpers/image-tools';
import DesktopSVG from './DesktopSVG';
import MobileSVG from './MobileSVG';
import { SizeContext } from '@contexts/SizeContext';


const Home = ({ data }) => {

  const {settings, content} = data;
  const {mobile}= useContext(SizeContext);

  const [mobileMenuOpen, setMenuOpen] = useState(false)

  const scrollTo = (e,slug, behavior = 'smooth') => {
     if (e) e.preventDefault();
     const el = document.getElementById(slug);
     el.scrollIntoView({ block: 'start', behavior: behavior });
     if(mobileMenuOpen) setMenuOpen(false)
  }

  function renderSection(section) {
    const { sectionType, content, items, winzers, images } = section

    switch (sectionType) {
      case 'text':
        return <TextSection content={content} />
      case 'dropdownList':
        return <DropdownSection items={items} />
      case 'winzer':
        return <WinzerSection winzers={winzers} />
      case 'images':
        return <ImageSection images={images} />
      default:
        return null
    }
  }

  return (
    <div className={`${style.Home} `}>

      <div className={style.header}>
         {mobile && <MobileSVG/>}
        {!mobile && <DesktopSVG/>}
      
      </div>

      <div className={style.sections}>
        {content.map((section, i) => {
          const {sectionType, slug, title, content, items, winzers, images} = section;
          return(
            <section className={style.section} key={slug.current} id={`${slug.current}-top`}>
              <h2 className={style.sectionTitle} style={{'--offset': `${i * 1.25}em`}}>
              <a href={`#${section.slug.current}`} onClick={(e) => scrollTo(e, slug.current, 'smooth')}>
                  {title}
                </a>
              </h2>
              <div className={style.sectionContent} id={slug.current}>
                 {renderSection(section)}
              </div>
            </section> 
          )
        })}
      </div>

      <div className={style.menu}>
        {content.map((section, i) => (
          <a  
          href={`#${section.slug.current}`} 
          key={i} 
          onClick={(e) => scrollTo(e, section.slug.current, 'smooth')}>
            {section.title}
          </a>
        ))}
      </div>

      <div className={`${style.mobileMenu} ${mobileMenuOpen ? style.open : ''}`}>
        <div className={`${style.burger} `} onClick={() => setMenuOpen(!mobileMenuOpen)}>
          <svg
                xmlns="http://www.w3.org/2000/svg"
                xmlnsXlink="http://www.w3.org/1999/xlink"
                version="1.1"
                viewBox={`${0} ${0} ${36} ${36}`}
                width={36}
                height={35}
                vectorEffect="non-scaling-stroke"
              >
                <g>
                <line
                className={style.topStroke}
                  x1={5}
                  y1={14}
                  x2={31}
                  y2={14}
                  strokeWidth={1.5}
                  stroke={'var(--green)'}
                />
                <line
                className={style.bottomStroke}
                  x1={5}
                  y1={22}
                  x2={31}
                  y2={22}
                  strokeWidth={1.5}
                  stroke={'var(--green)'}
                />
                </g>
              </svg>
        </div>
        <div className={style.menu}>
        {content.map((section, i) => (
          <a  
          href={`#${section.slug.current}`} 
          key={i} 
          onClick={(e) => scrollTo(e, `${section.slug.current}-top`,'instant')}>
            {section.title}
          </a>
        ))}
        </div>
      </div>

      {settings?.link && 
        <a href={settings?.link}  target='_blank' className={`${style.ticketLink}`}>
          Tickets
        </a>
      }
    </div>
  );
};

export default Home;


const TextSection = ({content}) => {
  if (!content) return null
  return <Content blocks={content} />
}

// DropdownSection.jsx
const DropdownSection = ({items}) => {
  if (!items?.length) return null

  const [openIndex, setOpenIndex] = useState(null);

  return (
    <div className={style.dropdown}>
      {items.map((it, idx) => (
        <div key={it._key || idx}>
          <div className={style.dropdownTitle} onClick={() => setOpenIndex(idx === openIndex ? null : idx)}>
            <span>{it.title}</span>
            <span className={style.dots}/>
            {(it.description || it.image )&& <span>{`( ${idx == openIndex ? 'schließen' : 'Info'} )`}</span>}
          </div>
          
            {(it.description || it.image) && 
          <Collapsable open={idx == openIndex}>
            <div className={style.dropdownContent}>
              {it.image && 
              <div className={style.dropdownImage}>
                <Media media={{type: 'image', image: it.image}} fit="cover" /> 
              </div>}
              {it.description && <Content blocks={it.description} />}
            </div>
          </Collapsable>
            }
        </div>
      ))}
    </div>
  )
}



const collator = new Intl.Collator('de', {sensitivity: 'base'})

const getId = (w, idx) => w._id || w._key || w.slug?.current || `i-${idx}`

const WinzerSection = ({ winzers }) =>{
  if (!winzers?.length) return null

  const [sortKey, setSortKey] = useState('name')   // 'name' | 'region' | 'wineStore'
  const [sortDir, setSortDir] = useState('asc')    // 'asc' | 'desc'
  const [openId, setOpenId] = useState(null)

  const onSort = (key) => {
    const nextDir = key === sortKey ? (sortDir === 'asc' ? 'desc' : 'asc') : 'asc'
    setSortKey(key)
    setSortDir(nextDir)
  }

  const indicator = (key) => (sortKey !== key ? '—' : sortDir === 'asc' ? '↑' : '↓')

  const sortedWinzers = useMemo(() => {
    const val = (w, k) => (w?.[k] ?? '').toString()
    const arr = [...winzers]
    arr.sort((a, b) => {
      let cmp = collator.compare(val(a, sortKey), val(b, sortKey))
      if (cmp === 0 && sortKey !== 'name') {
        // stable secondary by name ASC
        cmp = collator.compare(val(a, 'name'), val(b, 'name'))
      }
      return sortDir === 'asc' ? cmp : -cmp
    })
    return arr
  }, [winzers, sortKey, sortDir])

  const setOpen = (id) => {
    const opening = id !== openId
    setOpenId(opening ? id : null)
   /* if (opening) {
     const el = document.getElementById(`winzer-${id}`);
      if (!el) return;
      el.scrollIntoView({ block: 'center', behavior: 'smooth' });
    }*/
  }

  const headerBtnProps = (key) => ({
    role: 'button',
    tabIndex: 0,
    onClick: () => onSort(key),
    onKeyDown: (e) => {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onSort(key) }
    }
  })

  const TRUNC_BOUNDARY = /[\s,.;:()\-–—]/; // space & common separators

  function smartTruncate(str = '', max = 23) {
    if (str.length <= max) return str;
    // find last boundary ≤ max
    let cut = -1;
    for (let i = Math.min(max, str.length - 1); i >= 0; i--) {
      if (TRUNC_BOUNDARY.test(str[i])) { cut = i; break; }
    }
    const end = cut > 8 ? cut : max; // avoid cutting too early if no boundary
    return str.slice(0, end).trimEnd() + ' […]';
  }

  return (
    <div className={style.winzerList}>
      {/* Header row with sort controls */}
      <div className={`${style.winzerTitle} ${style.winzerHeader}`}>
        <span {...headerBtnProps('name')}>
          Name ({indicator('name')})
        </span>
        <span className={style.region} {...headerBtnProps('region')}>
          Land / Region ({indicator('region')})
        </span>
        <span className={style.wineStore} {...headerBtnProps('wineStore')}>
          Weinladen ({indicator('wineStore')})
        </span>
        <span className={style.mobileInfo}>
          
        </span>
      </div>

      {/* Rows */}
      {sortedWinzers.map((w, idx) => {
        const id = getId(w, idx);
        const hasContent = w.description || w.image;
        return (
          <div key={id} className={style.winzer}>
            <div className={`${style.winzerTitle} ${hasContent ? '' : style.empty}`} onClick={() => setOpen(id)} id={`winzer-${id}`}>
              {w?.name && 
                <span className={style.nameTrunc}
                  data-full={w.name} >
                  {smartTruncate(w.name, 23)}
                </span>
              }
              {w?.region && <span className={style.region}>{w.region}</span>}
              {w?.wineStore && <span className={style.wineStore}>{w.wineStore}</span>}
              <span className={style.dots}/>
              <span className={style.mobileInfo}>
                {`(${id == openId ? 'schließen' : 'info'})`}
              </span>
            </div>

            {(w.description || w.image) && (
              <Collapsable open={id === openId}>
                <div className={style.dropdownContent}>
                  {w.image && (
                    <div className={style.dropdownImage}>
                      <Media media={{ type: 'image', image: w.image }} fit="cover" />
                    </div>
                  )}
                  {w.description && (
                    <ContentWithInline
                      blocks={w.description}
                      appendInlineEnd={
                        <span
                          className={style.schliessen}
                          onClick={() => setOpenId(null)}
                          role="button"
                          tabIndex={0}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setOpenId(null) }
                          }}
                          aria-label="Beschreibung schließen"
                        >
                          (schließen)
                        </span>
                      }
                    />
                  )}
                </div>
              </Collapsable>
            )}
          </div>
        )
      })}
    </div>
  )
}


// ImageSection.jsx
const ImageSection = ({images}) => {
  if (!images?.length) return null
  return (
    <div className={style.imageSection}>
      {images?.map((img, idx) => {

        const ratio = getRatio(img);
        const landscape = ratio >= 1;

        if(img.asset) return(
          <div className={`${style.imageWrapper} ${landscape ? style.landscape : style.portrait}`} key={img._key || idx}>
            <div className={style.bg}/>
            <Media media={{type: 'image', image: img}} fit="cover" /> 
          </div>
        )
      })}
    </div>
  )
}


export const Collapsable = ({ open, children }) => {

  const [height, setHeight] = useState(0);
  const ref = useRef(null);


useEffect(() => {
  const measure = () => {

    if (ref.current) {
      setHeight(ref.current.scrollHeight);
    }
  };

  measure();

  window.addEventListener('resize', measure);
  return () => window.removeEventListener('resize', measure);
}, []);


  return (
      <div className={`${style.collabsable}`} style={{height: open ? height : 0}}>
        <div ref={ref}>
          {children}
        </div>
      </div> 
  );
};
