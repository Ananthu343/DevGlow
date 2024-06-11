import React, { useEffect, useState , useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getAllContent } from '../slices/adminSlice'
import UserCard from './UserCard'
import { archiveContent } from '../slices/adminSlice'
import toast from 'react-hot-toast'
import ContentOverview from './ContentOverview'

const ContentManage = () => {
  const { contentData } = useSelector(state => state.admin)
  const { users } = useSelector(state => state.post)
  const [modal, setModal] = useState(false)
  const [viewData, setViewData] = useState({})
  const [filter, setFilter] = useState("All");

  const dispatch = useDispatch()

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
};

  useEffect(() => {
    dispatch(getAllContent())
  }, [])

  const filteredData = useMemo(() => {
    let data = contentData;

    switch (filter) {
        case "Archived":
            data = contentData.filter(content => content.archive === true);
            break;
        case "Report":
            data = contentData.filter(content => content.reportCount > 20);
            break;
        default:
            break;
    }

    return data;
}, [contentData, filter]);

  const handleView = (content, creator) => {
    const data = {
      content,
      creator
    }
    setViewData(data)
    setModal(true)
  }

  const handleArchive = (id) => {
    dispatch(archiveContent(id)).then((action) => {
      if (action.meta.requestStatus === "rejected") {
        const errorMessage = "Unable to archive";
        toast.error(errorMessage);
      } else {
        toast.success("Done")
      }
    })
  }

  return (
    <div className='flex flex-col w-full'>
      <div className='flex justify-between w-[100%] pl-3 pr-3 border-b pb-3'>
        <div className='w-[30%] flex justify-between'>
          <h1 className='font-semibold text-[#720058]'>Content manage</h1>
          <div className='flex'>
                        <p>filter:</p>
                        <select onChange={handleFilterChange} value={filter} className='text-white bg-[#004272] rounded'>
                            <option value="All">All</option>
                            <option value="Archived">Archived</option>
                            <option value="Report">To report</option>
                        </select>
           </div>
        </div>
      </div>
      <div className='w-full h-[550px] flex flex-col overflow-y-scroll '>
        {
          filteredData?.length > 0 ?
            <table className="min-w-max w-full h-full divide-y divide-gray-200">
              <thead>
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Sl.no</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Creator</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Reports</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Details</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Archive</th>
                </tr>
              </thead>
              <tbody className="bg-white/40 divide-y divide-gray-200 ">
                {filteredData.map((content, index) => {
                  const creator = users.find((ele) => ele._id === content.creatorId)
                  return creator && (
                    <tr key={index}>
                      <td className="px-6 py-4 whitespace-nowrap">{index + 1}</td>
                      <td className="px-6 py-4 whitespace-nowrap"><UserCard user={creator} /></td>
                      <td className="px-6 py-4 whitespace-nowrap">{content?.reports.length}</td>
                      <td className='px-6 py-4 whitespace-nowrap'>
                        <svg onClick={() => handleView(content, creator)} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 cursor-pointer">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m5.231 13.481L15 17.25m-4.5-15H5.625c-.621 0-1.125.504-1.125 1.125v16.5c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Zm3.75 11.625a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0Z" />
                        </svg>

                      </td>
                      <td>
                        <svg onClick={()=>handleArchive(content._id)} xmlns="http://www.w3.org/2000/svg" fill={content.archive ? "black" : "none"} viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 cursor-pointer">
                          <path strokeLinecap="round" strokeLinejoin="round" d="m20.25 7.5-.625 10.632a2.25 2.25 0 0 1-2.247 2.118H6.622a2.25 2.25 0 0 1-2.247-2.118L3.75 7.5m8.25 3v6.75m0 0-3-3m3 3 3-3M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125Z" />
                        </svg>

                      </td>
                    </tr>
                  );
                })}
              </tbody>

            </table> :
            <div className='flex justify-center items-center w-full h-full'>
              <h1 >Empty data</h1>
            </div>
        }
      </div>
      {
        modal && <ContentOverview setModal={setModal} data={viewData} />
      }

    </div>
  )
}

export default ContentManage
