import { apiVersion, dataset, projectId, useCdn } from './sanity.api'
import { groq } from 'next-sanity'
import { createClient } from 'next-sanity'
//import { defineLive } from 'next-sanity'

/*export const {SanityLive, sanityFetch} = defineLive({
  client,
  serverToken: token,
  browserToken: token,
})*/

/**
 * Checks if it's safe to create a client instance, as `@sanity/client` will throw an error if `projectId` is false
 */
export const client = projectId
  ? createClient({ projectId, dataset, apiVersion, useCdn })
  : null

export const homeQuery = groq`{
  'settings': *[_type == "settings"][0],
  'content': *[_type == "section"] | order(orderRank), 
}
`
const settingsQuery=`{'settings': *[_type == "settings"][0], 'projects': *[_type == "projects"]{slug, client}}`;
const aboutQuery=`{'information': *[_type == "about"][0]{    ...,
    clients[]{
      ...,
      project->{
        _id,
        heroMedia,
        heroMode,
        duration,
        orderRank,
        slug
      },
    },
      collaborators[]{
      ...,
      project->{
        _id,
        heroMedia,
        heroMode,
        duration,
        orderRank,
        slug
      },
    }
  },
  'projectOrder': *[_type == "projects"]{_id, orderRank} | order(orderRank),
  'pageTitle': *[_type == "settings"][0]{menuTitle}
}`;

const legalQuery=`{'legal':*[_type == "legal"][0], 'pageTitle': *[_type == "settings"][0]{menuTitle}, 'information': *[_type == "about"][0]{footer}}`;
export const indexQuery = groq`*[_type == "projects"]{orderRank, slug, title, client, year, thumb, duration, thumbLayout} | order(orderRank)`

export const projectSlugsQuery = groq`*[_type == "projects"]{slug}`;
export const projectBySlugQuery = groq`{'project': *[_type == "projects" && slug.current == $slug][0], 'projectOrder': *[_type == "projects"]{_id, orderRank, slug} | order(orderRank)}`;
export const nextProjectBySlugQuery = groq`*[_type == "projects" && slug.current == $slug][0]{client, duration, heroMedia, heroMode, orderRank, slug, service}`;
export const interimQuery = groq`*[_type == "interim"][0]{
  _id,
  _type,
  link,
  text[]{
    ...,
    markDefs[]{
      ...,
      _type == "link" => {
        ...,
        // Generate a usable URL from the file OR fallback to href
        "url": coalesce(file.asset->url, href),
        // Expose optional download filename
        "fileName": file.asset->originalFilename,
        // Expose extension/size if you want
        "fileExtension": file.asset->extension,
        "fileSize": file.asset->size
      }
    }
  }
}`;

export async function getProjectSlugs(): Promise<any> {
  if (client) {
    return await client.fetch(projectSlugsQuery) || {}
  }
  return {}
}


export async function getProjectBySlug(slug: string): Promise<any> {
  return await client.fetch(projectBySlugQuery, { slug });
}

export async function getNextProjectBySlug(slug: string): Promise<any> {
  return await client.fetch(nextProjectBySlugQuery, { slug });
}

export async function getInterim(): Promise<any> {
  if (client) {
    return await client.fetch(interimQuery) || {}
  }
  return {}
}

export async function getHome(): Promise<any> {
  if (client) {
    return await client.fetch(homeQuery) || {}
  }
  return {}
}

export async function getIndex(): Promise<any> {
  if (client) {
    return await client.fetch(indexQuery) || {}
  }
  return {}
}

export async function getSettings(): Promise<any> {
  if (client) {
    return await client.fetch(settingsQuery) || {}
  }
  return {}
}

export async function getLegal(): Promise<any> {
  if (client) {
    return await client.fetch(legalQuery) || {}
  }
  return {}
}

export async function getAbout(): Promise<any> {
  if (client) {
    return await client.fetch(aboutQuery) || {}
  }
  return {}
}


