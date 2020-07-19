import { compact } from 'lodash'
import { ChatRoleType } from '../../../utils/types'
import api from '../../../services/httpService'

const handleRemoveParticipant = async (participantId, chatId) => {
  await api.delete(`/chats/${chatId}/participants/${participantId}`)
}

const handleSetAsAdmin = async (participantId, chatId) => {
  await api.put(`/chats/${chatId}/participants/${participantId}/set-admin-role`)
}

export const getContextMenuItems = (
  particiapantId,
  currentUserId,
  participantRole,
  currentUserRole,
  chatId
) => {
  const canRemove =
    particiapantId === currentUserId ||
    (currentUserRole === ChatRoleType.Admin &&
      participantRole !== ChatRoleType.Admin)

  const canSetAsAdmin =
    currentUserRole === ChatRoleType.Admin &&
    participantRole !== ChatRoleType.Admin

  return compact([
    canRemove && {
      id: 'remove',
      text: particiapantId === currentUserId ? 'Leave chat' : 'Remove',
      onClick: async () => await handleRemoveParticipant(particiapantId, chatId)
    },
    canSetAsAdmin && {
      id: 'setAsAdmin',
      text: 'Set as admin',
      onClick: async () => await handleSetAsAdmin(particiapantId, chatId)
    }
  ])
}
