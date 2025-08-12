import { StructureBuilder, StructureResolver } from "sanity/structure";
import {UserIcon, CaseIcon, InfoOutlineIcon, ControlsIcon, CalendarIcon, PlayIcon, ComposeIcon } from '@sanity/icons'
import {orderableDocumentListDeskItem} from '@sanity/orderable-document-list'

export const StudioStructure = (S : StructureBuilder, context) =>

//List = root item, will appear in Studios first column since it is not a child
S.list()
.title('Desk')
.items([
  //Single Page Document
  S.listItem()
  .title("Interrim")
  .id("interrim")
  .icon(ComposeIcon)
  .child(
    S.document()
      .schemaType("interim")
      .documentId("interim")
      .title("Interim")
  ),
     // Regular document types, allows multiple documents
    /*orderableDocumentListDeskItem({
      type: "projects",
      title: "Projects",
      icon: ComposeIcon,
      S,
      context,
    }),*/

    // ... all other desk items
    /*Single Page Document
     S.listItem()
     .title("About")
     .id("about")
     .icon(UserIcon)
     .child(
       S.document()
         .schemaType("about")
         .documentId("about")
         .title("About")
     ),
     S.listItem()
     .title("Legal")
     .id("legal")
     .icon(CaseIcon)
     .child(
       S.document()
         .schemaType("legal")
         .documentId("legal")
         .title("Legal")
     ),*/
    S.divider(),
    //Single Page Document
    S.listItem()
    .title("Settings")
    .id("settings")
    .icon(ControlsIcon)
    .child(
      S.document()
        .schemaType("settings")
        .documentId("settings")
        .title("Settings")
    )
])