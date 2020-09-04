import { compact } from 'lodash'
import { ChatRole } from '../../../apiContracts/chatContracts'

export const getContextMenuItems = (
  particiapantId: string,
  currentUserId: string,
  participantRole: ChatRole,
  currentUserRole: ChatRole,
  onDeleteParticipant: (id: string) => void,
  onSetParticipantAsAdmin: (id: string) => void
) => {
  const canRemove =
    particiapantId === currentUserId ||
    (currentUserRole === 'admin' && participantRole !== 'admin')

  const canSetAsAdmin = currentUserRole === 'admin' && participantRole !== 'admin'

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
