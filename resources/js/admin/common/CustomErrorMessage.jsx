
export const CustomErrorMessage = ({message}) => {
  return (
    <div>
      <i
        className="pi pi-times-circle p-input-icon-left text-red-600 me-1"
        style={{ fontSize: '16px' }}
        data-pr-position="left"
        data-pr-at="center right"
        data-pr-my="center left"
      />
      <span className={'text-red-600'}>{message}</span>
    </div>
  )
}
