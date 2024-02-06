class Builders::Helpers < SiteBuilder
  def build
    helper :equal_paths do |p1, p2|
      p1.chomp('/') == p2.chomp('/')
    end
  end
end
