class ApiFeatures {
    constructor(query, queryStr) {
        this.query = query;
        this.queryStr = queryStr;
    }

    search() {
        const keywordQuery = this.queryStr.keyword
            ? {
                name: {
                    $regex: this.queryStr.keyword,
                    $options: "i",
                },
            }
            : {};

        this.query = this.query.find({ ...keywordQuery });
        return this;
    }

    filter() {
        const queryCopy = { ...this.queryStr };

        //   Removing some fields for category
        const removeFields = ["keyword", "page", "limit"];
        removeFields.forEach((key) => delete queryCopy[key]);

        // Filter For Price and Rating
        let queryStr = JSON.stringify(queryCopy);
        queryStr = queryStr.replace(/\b(gt|gte|lt|lte)\b/g, (key) => `$${key}`);


        //start

        // Filter by Category
        if (this.queryStr.category) {
            this.query = this.query.find({ category: this.queryStr.category });
        }
        // Filter by Subcategory
        if (this.queryStr.subcategory && this.queryStr.category) {
            this.query = this.query.find({ subcategory: this.queryStr.subcategory });
        }
        // // Filter by Subcategory and Category
        // if (this.queryStr.subcategory || this.queryStr.category) {
        //     const filter = {};
        //     if (this.queryStr.subcategory) {
        //         filter.subcategory = this.queryStr.subcategory;
        //     }
        //     if (this.queryStr.category) {
        //         filter.category = this.queryStr.category;
        //     }
        //     this.query = this.query.find(filter);
        // }


        //end


        this.query = this.query.find(JSON.parse(queryStr));
        return this;
    }

    pagination(resultPerPage) {
        const currentPage = Number(this.queryStr.page) || 1;

        const skip = resultPerPage * (currentPage - 1);

        this.query = this.query.limit(resultPerPage).skip(skip);

        return this;
    }
}

module.exports = ApiFeatures;