import { MutationResolvers } from '@generated/server';
import firebaseAdmin from '@services/firebase/admin';

import { PartnerVisitor } from '@models/partner';

interface Resolvers {
  Mutation: MutationResolvers;
}

export const resolvers: Resolvers = {
  Mutation: {
    promoteToPartner: async (parent, { uid }, { me }) => {
      try {
        await firebaseAdmin.auth().setCustomUserClaims(uid, {
          ...me.customClaims,
          partner: true,
        });
      } catch (error) {
        return false;
      }

      return true;
    },
    partnerTrackVisitor: async (
      parent,
      { partnerId },
      { partnerVisitorRepository }
    ) => {
      try {
        const partnerVisitor = new PartnerVisitor();
        console.log(partnerId);
        partnerVisitor.partnerId = partnerId;

        partnerVisitorRepository.save(partnerVisitor);
      } catch (error) {
        return false;
      }

      return true;
    },
  },
};
