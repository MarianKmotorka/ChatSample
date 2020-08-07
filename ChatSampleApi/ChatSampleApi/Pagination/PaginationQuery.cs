namespace ChatSampleApi.Pagination
{
    public class PaginationQuery
    {
        private int _count;
        private int _skip;

        public int Count
        {
            get => _count;
            set
            {
                if (value > 100) value = 100;
                if (value < 1) value = 1;
                _count = value;
            }
        }
        public int Skip
        {
            get => _skip;
            set
            {
                if (value < 0) value = 0;
                _skip = value;
            }
        }

        public PaginationQuery()
        {
            Count = 50;
            Skip = 0;
        }
    }
}
