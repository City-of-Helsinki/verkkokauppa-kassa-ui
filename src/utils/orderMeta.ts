import type {
    MetaParameter
} from '../types/meta/types'

const parseOrderItemMetaVisibilityAndOrdinal = (metaItems: any) => {
   
    if (!Array.isArray(metaItems)) {
        return []
    }

    let metaItemsOrdinal: MetaParameter[] = []
    let metaItemsNoOrdinal: MetaParameter[] = []

    metaItems
    .filter(
        (meta) => meta.visibleInCheckout === 'true' || !meta.visibleInCheckout
    )
    .forEach((metaItem: MetaParameter) => {        
      if (metaItem['ordinal']) {
        metaItemsOrdinal[parseInt(metaItem['ordinal'])] = metaItem
      } else {
        metaItemsNoOrdinal.push(metaItem)
      }
    })    
    
    return [...metaItemsOrdinal, ...metaItemsNoOrdinal].filter(function(el) { return el; });
};

export {parseOrderItemMetaVisibilityAndOrdinal};
