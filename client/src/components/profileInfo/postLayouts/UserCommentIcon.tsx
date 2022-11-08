// Icon
import CommentIcon from '@mui/icons-material/Comment'

// Hooks
import { useState } from "react"

// Components
import CommentModal from '../../commentModal/CommentModal'

interface props {
  commentCount: string | undefined,
  postID: string | undefined
}

const UserCommentIcon = ({ commentCount, postID }: props) => {

  const [open, setOpen] = useState<boolean>(false)

  const handleOpen = () => setOpen(true)

  return (
    <>
      <CommentIcon sx={{cursor: "pointer", marginRight: "5px"}} onClick={handleOpen}/>
      <span>{commentCount}</span>
      <CommentModal postID={postID} open={open} setOpen={setOpen}/>
    </>
  )

}

export default UserCommentIcon