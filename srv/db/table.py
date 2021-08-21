import pymongo
from pymongo.collection import Collection


def to_json(_data):
    data = []
    for d in _data:
        d["id"] = str(d.pop("_id"))
        data.append(d)
    return data


class Table(Collection):
    # 查询:
    # 默认过滤条件：没有
    # 默认排序：没有
    # 默认数量限制：10.如果有数量限制，返回json数据；否则直接返回查询句柄对象
    def query(self, filter={}, sortby=None, order=1, limit=10, page=0):
        data = self.find(filter)
        if sortby:
            data.sort([(sortby, order)])

        if page:
            data.skip(page * limit)

        if limit:
            return to_json(data.limit(limit))
        else:
            return data

    # 添加不重复的记录,默认的索引id是“_id”
    def add_one(self, doc, index_key="_id", index_keys=[], all_keys=False):
        if all_keys:  # 如果将所有字读加入索引
            if self.find_one(doc):
                pass
            else:
                # 如果没有找到重复条目，则插入新条目
                self.insert_one(doc)

        else:  # 否则默认将"_id"作为索引
            if index_key in doc:
                index_keys.append(index_key)

            # 过滤器
            filter = {}
            for k in index_keys:
                if k in doc:
                    filter[k] = doc[k]
            if self.find_one(filter):
                # 更新条目
                self.update_one(filter, {"$set": doc})
            else:
                # 插入新条目
                self.insert_one(doc)