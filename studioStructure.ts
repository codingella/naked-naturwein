import { StructureBuilder, StructureResolver } from "sanity/structure";
import {UserIcon, CaseIcon, InfoOutlineIcon, ControlsIcon, CalendarIcon, PlayIcon, ComposeIcon } from '@sanity/icons'
import {orderableDocumentListDeskItem} from '@sanity/orderable-document-list'

export const StudioStructure = (S : StructureBuilder, context) =>

//List = root item, will appear in Studios first column since it is not a child
S.list()
.title('Desk')
.items([
       // Regular document types, allows multiple documents
  orderableDocumentListDeskItem({
      type: "section",
      title: "Abschnitte",
      icon: ComposeIcon,
      S,
      context,
    }),
  //Single Page Document
  S.listItem()
  .title("Interrim (alt)")
  .id("interrim")
  .icon(ComposeIcon)
  .child(
    S.document()
      .schemaType("interim")
      .documentId("interim")
      .title("Interim")
  ),


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