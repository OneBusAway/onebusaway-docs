require 'algolia'
require "nokogiri"

class AlgoliaIndexer
  def initialize(site:, id:, secret:, index:)
    @site = site
    @id = id
    @secret = secret
    @index = index
  end

  def run
    indexable_objects = []
    @site.collections['pages'].each do |p|
      next if p.data.searchable == false

      indexable_objects << {
        title: p.data.title,
        objectID: p.id,
        url: p.absolute_url,
        content: Nokogiri::HTML(p.content).text
      }
    end

    client = Algolia::Search::Client.create(@id, @secret)
    index = client.init_index(@index)
    index.save_objects(indexable_objects)
  end
end