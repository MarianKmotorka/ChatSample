import { compact } from 'lodash'
import { ChatRoleType } from '../../../utils/types'

export const getContextMenuItems = ({
  particiapantId,
  currentUserId,
  participantRole,
  currentUserRole,
  onDeleteParticipant,
  onSetParticipantAsAdmin
}) => {
  const canRemove =
    particiapantId === currentUserId ||
    (currentUserRole === ChatRoleType.Admin && participantRole !== ChatRoleType.Admin)

  const canSetAsAdmin =
    currentUserRole === ChatRoleType.Admin && participantRole !== ChatRoleType.Admin

  return compact([
    canRemove && {
      id: 'remove',
      text: particiapantId === currentUserId ? 'Leave chat' : 'Remove',
      onClick: async () => onDeleteParticipant(particiapantId)
    },
    canSetAsAdmin && {
      id: 'setAsAdmin',
      text: 'Set as admin',
      onClick: async () => onSetParticipantAsAdmin(particiapantId)
    }
  ])
}
