function AllRoomsSkeleton({ isMyRoom }) {
  return (
    <div className="w-full h-14 flex mt-5 justify-between items-center">
      <div>
        <div className="w-44 h-4 bg-gray-400 animate-pulse rounded-lg" />
        <div className="flex gap-x-1">
          <div className="w-44 h-4 bg-gray-400 animate-pulse rounded-lg mt-2" />
          <div className="w-10 h-4 bg-gray-400 animate-pulse rounded-lg mt-2" />
        </div>
      </div>
      <div className="flex gap-x-1">
        <div className="w-24 h-6 bg-gray-400 animate-pulse rounded-lg mt-2" />
        {isMyRoom ? (
          <div className="w-24 h-6 bg-gray-400 animate-pulse rounded-lg mt-2" />
        ) : null}
      </div>
    </div>
  );
}

export default AllRoomsSkeleton;
